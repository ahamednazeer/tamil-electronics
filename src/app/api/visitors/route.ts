import { NextRequest, NextResponse } from 'next/server'
import { BetaAnalyticsDataClient } from '@google-analytics/data'

/**
 * GA4 Data API-powered visitor tracker.
 *
 * ── Total visitors ──  GA4 `runReport` → `totalUsers` (all-time)
 * ── Active visitors ── GA4 `runRealtimeReport` → `activeUsers` (live now)
 *
 * Also maintains a heartbeat-based active counter as fallback
 * in case GA4 credentials aren't configured.
 *
 * Env variables needed:
 *   GA_CLIENT_EMAIL   – service account email
 *   GA_PRIVATE_KEY    – PEM private key (with \n escaped)
 *   GA_PROPERTY_ID    – numeric GA4 property ID (found in GA4 Admin → Property Settings)
 */

// ── GA4 client (singleton) ────────────────────────────────────────
let analyticsClient: BetaAnalyticsDataClient | null = null

function getGAClient(): BetaAnalyticsDataClient | null {
  if (analyticsClient) return analyticsClient

  const clientEmail = process.env.GA_CLIENT_EMAIL
  const privateKey = process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n')
  const propertyId = process.env.GA_PROPERTY_ID

  if (!clientEmail || !privateKey || !propertyId) return null

  analyticsClient = new BetaAnalyticsDataClient({
    credentials: { client_email: clientEmail, private_key: privateKey },
  })

  return analyticsClient
}

// ── Cache to avoid hammering GA4 API ──────────────────────────────
let cachedTotal = 0
let cachedActive = 0
let lastFetchedTotal = 0
let lastFetchedActive = 0

const TOTAL_CACHE_MS = 3600_000 // re-fetch total every 1 hour
const ACTIVE_CACHE_MS = 30_000  // re-fetch active every 30 s

// ── Fallback: heartbeat-based tracking ────────────────────────────
const TIMEOUT_MS = 60_000
const activeVisitors = new Map<string, number>()
const allVisitorIds = new Set<string>()

function pruneStale() {
  const now = Date.now()
  for (const [id, ts] of activeVisitors) {
    if (now - ts > TIMEOUT_MS) activeVisitors.delete(id)
  }
}

// ── Fetch total users from GA4 ────────────────────────────────────
async function fetchTotalUsers(): Promise<number> {
  const now = Date.now()
  if (cachedTotal > 0 && now - lastFetchedTotal < TOTAL_CACHE_MS) return cachedTotal

  const client = getGAClient()
  const propertyId = process.env.GA_PROPERTY_ID
  if (!client || !propertyId) return allVisitorIds.size // fallback

  try {
    const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '2020-01-01', endDate: 'today' }],
      metrics: [{ name: 'totalUsers' }],
    })

    const count = parseInt(response?.rows?.[0]?.metricValues?.[0]?.value || '0', 10)
    cachedTotal = count
    lastFetchedTotal = now
    return count
  } catch (err) {
    console.error('[GA4] Failed to fetch total users:', err)
    return cachedTotal || allVisitorIds.size
  }
}

// ── Fetch realtime active users from GA4 ──────────────────────────
async function fetchActiveUsers(): Promise<number> {
  const now = Date.now()
  if (cachedActive > 0 && now - lastFetchedActive < ACTIVE_CACHE_MS) return cachedActive

  const client = getGAClient()
  const propertyId = process.env.GA_PROPERTY_ID
  if (!client || !propertyId) {
    pruneStale()
    return activeVisitors.size // fallback
  }

  try {
    const [response] = await client.runRealtimeReport({
      property: `properties/${propertyId}`,
      metrics: [{ name: 'activeUsers' }],
    })

    const count = parseInt(response?.rows?.[0]?.metricValues?.[0]?.value || '0', 10)
    cachedActive = count
    lastFetchedActive = now
    return count
  } catch (err) {
    console.error('[GA4] Failed to fetch active users:', err)
    pruneStale()
    return cachedActive || activeVisitors.size
  }
}

// ── GET: return both counts ───────────────────────────────────────
export async function GET() {
  const [total, active] = await Promise.all([fetchTotalUsers(), fetchActiveUsers()])

  return NextResponse.json({ total, active })
}

// ── POST: heartbeat (also used as fallback counter) ───────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const id = typeof body?.visitorId === 'string' ? body.visitorId.slice(0, 64) : ''

    if (!id) {
      return NextResponse.json({ error: 'missing visitorId' }, { status: 400 })
    }

    // Always track in the fallback map
    activeVisitors.set(id, Date.now())
    allVisitorIds.add(id)
    pruneStale()

    // Fetch real GA4 data (falls back to in-memory if no creds)
    const [total, active] = await Promise.all([fetchTotalUsers(), fetchActiveUsers()])

    return NextResponse.json({ total, active })
  } catch {
    return NextResponse.json({ error: 'bad request' }, { status: 400 })
  }
}
