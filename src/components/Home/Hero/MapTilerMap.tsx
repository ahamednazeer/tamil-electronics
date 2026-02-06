'use client'

import { useEffect, useRef } from 'react'

const MapTilerMap = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const maptilerKey = process.env.NEXT_PUBLIC_MAPTILER_KEY
  const maptilerStyle = process.env.NEXT_PUBLIC_MAPTILER_STYLE || 'basic-v2'
  const center: [number, number] = [79.3236843607538, 11.521112888557493]
  const zoom = 16.2

  useEffect(() => {
    if (!maptilerKey || !containerRef.current) return
    let disposed = false

    const initMap = () => {
      const maplibregl = (window as any).maplibregl
      if (!maplibregl || !containerRef.current || mapRef.current) return

      const map = new maplibregl.Map({
        container: containerRef.current,
        style: `https://api.maptiler.com/maps/${maptilerStyle}/style.json?key=${maptilerKey}`,
        center,
        zoom,
        interactive: false,
        attributionControl: false,
      })

      mapRef.current = map

      map.on('load', () => {
        if (disposed) return
        map.addSource('mt-buildings', {
          type: 'vector',
          url: `https://api.maptiler.com/tiles/buildings/tiles.json?key=${maptilerKey}`,
        })
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

        const markerEl = document.createElement('div')
        markerEl.className = 'hero-map-marker'
        new maplibregl.Marker({ element: markerEl })
          .setLngLat(center)
          .addTo(map)
      })
    }

    const loadAssets = () => {
      if ((window as any).maplibregl) {
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
  }, [maptilerKey, maptilerStyle, center, zoom])

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
