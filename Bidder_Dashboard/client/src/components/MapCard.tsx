import { useEffect, useRef, useState } from 'react';
import { FiMaximize } from 'react-icons/fi';
import mapboxgl from 'mapbox-gl';
import { useQuery } from '@tanstack/react-query';
import { DashboardResponse } from '@shared/schema';

interface MapMarker {
  lng: number;
  lat: number;
  type: 'green' | 'yellow' | 'orange' | 'red';
  popupText: string;
}

interface MapCardProps {
  markers: MapMarker[];
}

export default function MapCard({ markers }: MapCardProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  
  // Get dashboard data including the Mapbox token
  const { data: dashboardData } = useQuery<DashboardResponse>({
    queryKey: ['/api/dashboard'],
  });
  
  // Initialize map when token is available
  useEffect(() => {
    // Skip if map already exists or no token is available
    if (map.current || !dashboardData || !dashboardData.mapboxToken) return;
    
    // Set the Mapbox access token
    mapboxgl.accessToken = dashboardData.mapboxToken || import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || '';
    
    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [24.0, -29.0], // Center of South Africa
        zoom: 5,
        attributionControl: false
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add fullscreen control
      map.current.addControl(new mapboxgl.FullscreenControl());
    }
  }, [dashboardData]);

  // Add markers when map is initialized and markers are available
  useEffect(() => {
    if (!map.current || !markers?.length) return;
    
    const mapInstance = map.current;
    
    // Check if map is loaded
    if (mapInstance.loaded()) {
      addMarkersToMap(mapInstance);
    } else {
      // Wait for map to load before adding markers
      mapInstance.on('load', () => {
        addMarkersToMap(mapInstance);
      });
    }
    
    function addMarkersToMap(mapInstance: mapboxgl.Map) {
      // Add markers to the map
      markers.forEach((marker) => {
        // Define marker element
        const el = document.createElement('div');
        el.style.width = '20px';
        el.style.height = '20px';
        el.style.borderRadius = '50%';
        
        // Set color based on type
        switch (marker.type) {
          case 'green':
            el.style.backgroundColor = '#4CAF50';
            break;
          case 'yellow':
            el.style.backgroundColor = '#FFEB3B';
            break;
          case 'orange':
            el.style.backgroundColor = '#FF9800';
            break;
          case 'red':
            el.style.backgroundColor = '#F44336';
            break;
          default:
            el.style.backgroundColor = '#4CAF50';
        }
        
        el.style.cursor = 'pointer';
        
        // Add marker to map
        const mapMarker = new mapboxgl.Marker(el)
          .setLngLat([marker.lng, marker.lat])
          .addTo(mapInstance);
        
        // Show popup on marker click
        el.addEventListener('click', () => {
          setSelectedMarker(marker);
        });
      });
    }
  }, [markers]);

  // Update popup when selectedMarker changes
  useEffect(() => {
    if (!selectedMarker || !map.current) return;
    
    const popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat([selectedMarker.lng, selectedMarker.lat])
      .setHTML(`<div class="p-2">${selectedMarker.popupText}</div>`)
      .addTo(map.current);
    
    return () => {
      popup.remove();
    };
  }, [selectedMarker]);

  return (
    <div className="bg-card-bg p-4 rounded-lg shadow-md">
      <div className="relative">
        <div ref={mapContainer} className="w-full h-[380px] rounded-lg" />
        
        {selectedMarker?.popupText === 'Limpopo, view this RFQ' && (
          <div className="absolute bottom-4 right-4 bg-card-bg p-2 rounded-lg shadow-lg z-10">
            <p className="text-sm text-white">Limpopo, view this RFQ</p>
          </div>
        )}
      </div>
    </div>
  );
}