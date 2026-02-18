'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'

const MAP_CENTER: [number, number] = [79.3236843607538, 11.521112888557493]
const MAP_ZOOM = 16.2

type MapSource = {
  type: 'vector'
  url: string
}

type MapLayer = {
  id: string
  type: 'fill' | 'line'
  source: string
  'source-layer': string
  paint: Record<string, string | number>
}

interface MapInstance {
  setStyle: (style: string) => void
  on: (event: 'load', callback: () => void) => void
  getSource: (id: string) => unknown
  addSource: (id: string, source: MapSource) => void
  getLayer: (id: string) => unknown
  addLayer: (layer: MapLayer) => void
  remove: () => void
}

interface MarkerInstance {
  setLngLat: (lngLat: [number, number]) => MarkerInstance
  addTo: (map: MapInstance) => MarkerInstance
}

interface MapLibreGL {
  Map: new (options: {
    container: HTMLElement
    style: string
    center: [number, number]
    zoom: number
    interactive: boolean
    attributionControl: boolean
  }) => MapInstance
  Marker: new (options: { element: HTMLElement }) => MarkerInstance
}

type MapWindow = Window & {
  maplibregl?: MapLibreGL
}

const MapTilerMap = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MapInstance | null>(null)
  const { resolvedTheme } = useTheme()
  const [shouldLoad, setShouldLoad] = useState(false)
  const maptilerKey = process.env.NEXT_PUBLIC_MAPTILER_KEY
  const maptilerStyle = process.env.NEXT_PUBLIC_MAPTILER_STYLE || 'basic-v2'
  const maptilerStyleDark = process.env.NEXT_PUBLIC_MAPTILER_STYLE_DARK || 'dataviz-dark'

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!shouldLoad || !maptilerKey || !containerRef.current) return
    let disposed = false

    const initMap = () => {
      const maplibregl = (window as MapWindow).maplibregl
      if (!maplibregl || !containerRef.current) return

      const styleId = (resolvedTheme === 'dark')
        ? maptilerStyleDark
        : maptilerStyle

      if (mapRef.current) {
        mapRef.current.setStyle(`https://api.maptiler.com/maps/${styleId}/style.json?key=${maptilerKey}`)
        return
      }

      const map = new maplibregl.Map({
        container: containerRef.current,
        style: `https://api.maptiler.com/maps/${styleId}/style.json?key=${maptilerKey}`,
        center: MAP_CENTER,
        zoom: MAP_ZOOM,
        interactive: false,
        attributionControl: false,
      })

      mapRef.current = map

      map.on('load', () => {
        if (disposed) return
        if (!map.getSource('mt-buildings')) {
          map.addSource('mt-buildings', {
            type: 'vector',
            url: `https://api.maptiler.com/tiles/buildings/tiles.json?key=${maptilerKey}`,
          })
        }
        if (!map.getLayer('mt-buildings-fill')) {
          map.addLayer({
            id: 'mt-buildings-fill',
            type: 'fill',
            source: 'mt-buildings',
            'source-layer': 'building',
            paint: {
              'fill-color': '#E31E24',
              'fill-opacity': 0.16,
            },
          })
        }
        if (!map.getLayer('mt-buildings-outline')) {
          map.addLayer({
            id: 'mt-buildings-outline',
            type: 'line',
            source: 'mt-buildings',
            'source-layer': 'building',
            paint: {
              'line-color': '#E31E24',
              'line-width': 0.7,
              'line-opacity': 0.5,
            },
          })
        }

        const markerEl = document.createElement('div')
        markerEl.className = 'hero-map-marker'
        if (!markerEl.parentElement) {
          new maplibregl.Marker({ element: markerEl })
            .setLngLat(MAP_CENTER)
            .addTo(map)
        }
      })
    }

    const loadAssets = () => {
      if ((window as MapWindow).maplibregl) {
        initMap()
        return
      }

      const scriptId = 'maplibre-gl-script'
      const styleId = 'maplibre-gl-style'

      if (!document.getElementById(styleId)) {
        const link = document.createElement('link')
        link.id = styleId
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.css'
        document.head.appendChild(link)
      }

      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script')
        script.id = scriptId
        script.src = 'https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.js'
        script.async = true
        script.onload = initMap
        document.body.appendChild(script)
      } else {
        initMap()
      }
    }

    loadAssets()

    return () => {
      disposed = true
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [shouldLoad, maptilerKey, maptilerStyle, maptilerStyleDark, resolvedTheme])

  if (!maptilerKey) {
    return (
      <div className='hero-map-fallback'>
        Add `NEXT_PUBLIC_MAPTILER_KEY` to show the map.
      </div>
    )
  }

  return <div ref={containerRef} className='hero-map-canvas' />
}

export default MapTilerMap
