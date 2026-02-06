import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { School, SchoolStatus, RiskLevel } from '../types';

// Fix for default Leaflet markers in Webpack/React env
// We'll use a simple colored circle SVG for markers to match HHWS colors
const createCustomIcon = (level?: RiskLevel) => {
  let color = '#3b82f6'; // blue default
  if (level === RiskLevel.GREEN) color = '#22c55e';
  if (level === RiskLevel.AMBER) color = '#f59e0b';
  if (level === RiskLevel.RED) color = '#dc2626';

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
    </svg>
  `;
  
  return L.divIcon({
    html: svg,
    className: 'custom-leaflet-icon', // No extra styling needed if SVG handles it
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

interface SchoolsMapProps {
  schoolsData: SchoolStatus[];
  selectedSchoolId: string | null;
  onSelectSchool: (id: string) => void;
}

// Component to handle map centering
const MapController: React.FC<{ center: [number, number], zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom);
  }, [center, zoom, map]);
  return null;
};

export const SchoolsMap: React.FC<SchoolsMapProps> = ({ schoolsData, selectedSchoolId, onSelectSchool }) => {
  // Default center (KZN Midlands approx)
  const defaultCenter: [number, number] = [-29.45, 30.2];
  const defaultZoom = 9;

  const selectedData = schoolsData.find(s => s.school.id === selectedSchoolId);
  const mapCenter = selectedData 
    ? [selectedData.school.coordinates.lat, selectedData.school.coordinates.lng] as [number, number]
    : defaultCenter;
  
  const mapZoom = selectedData ? 13 : defaultZoom;

  return (
    <div className="h-full w-full bg-slate-100 rounded-xl overflow-hidden shadow-inner border border-slate-200">
      <MapContainer 
        center={defaultCenter} 
        zoom={defaultZoom} 
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <MapController center={mapCenter} zoom={mapZoom} />

        {schoolsData.map((data) => (
          <Marker
            key={data.school.id}
            position={[data.school.coordinates.lat, data.school.coordinates.lng]}
            icon={createCustomIcon(data.status?.level)}
            eventHandlers={{
              click: () => onSelectSchool(data.school.id),
            }}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-bold text-slate-800">{data.school.name}</h3>
                {data.weather && (
                  <div className="text-sm">
                    <p>{data.weather.temperature}°C</p>
                    <p className="font-semibold" style={{
                      color: data.status?.level === 'RED' ? 'red' : data.status?.level === 'AMBER' ? 'orange' : 'green'
                    }}>{data.status?.level}</p>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
