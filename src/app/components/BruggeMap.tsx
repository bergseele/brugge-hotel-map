'use client';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, ZoomControl, useMap, Polyline, Tooltip } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { hotels } from './hotelData';



interface Hotel {
  name: string;
  coords: LatLngExpression;
  rooms: number;
  restaurants: number;
  address: string;
  website: string;
}

interface RouteInfo {
  distance: number;
  duration: number;
}

// Street routing component
const StreetRouting = ({ 
  hotelCoords, 
  onRouteData 
}: { 
  hotelCoords: LatLngExpression | null;
  onRouteData?: (data: RouteInfo) => void;
}) => {
  const map = useMap();
  const [routeLayer] = useState<L.Layer | null>(null);
  interface RouteData {
    routes: {
      geometry: {
        coordinates: [number, number][];
      };
    }[];
  }
  const [routeData, setRouteData] = useState<RouteData | null>(null);
  
  useEffect(() => {
    if (routeLayer) {
      map.removeLayer(routeLayer);
    }
    

    if (!hotelCoords) return;

    // brugge railway station coordinates
    const stationCoords: LatLngExpression = [51.19765672, 3.21775997];

    // define state for route data

    const fetchRoute = async () => {
        try {
          const url = `https://router.project-osrm.org/route/v1/foot/${stationCoords[1]},${stationCoords[0]};${(hotelCoords as number[])[1]},${(hotelCoords as number[])[0]}?overview=full&geometries=geojson`;
      
          console.log("Fetching route from:", url); // Debugging
      
          const response = await fetch(url);
      
          // 🔹 Check if response is HTML instead of JSON
          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            throw new Error("OSRM API returned an invalid response.");
          }
      
          // 🔹 Check if the response is okay
          if (!response.ok) {
            throw new Error(`OSRM API error: ${response.statusText}`);
          }
      
          const data = await response.json();
      
          // 🔹 Check if API returned valid data
          if (!data.routes || data.routes.length === 0) {
            throw new Error("No route found.");
          }
      
          console.log("Fetched route data:", data); // Debugging
          setRouteData(data); // ✅ Store the fetched route data
        } catch (error) {
          console.error("Error fetching route:", error);
        }
      };
      
      fetchRoute();  // now calling fetchRoute() when component mounts

    return () => {
      if (routeLayer) {
        map.removeLayer(routeLayer);
      }
    };
  }, [hotelCoords, map, onRouteData, routeLayer]);

  return (
    <>
    {routeData && (
        <Polyline
        positions={routeData.routes[0].geometry.coordinates.map(([lng, lat]: [number, number]) => [lat, lng])}
        color="blue"
        weight={4}
        opacity={0.8}
        />
    )}
    </>
  );
};

const historicLandmarks: { name: string; coords: [number, number]; iconUrl: string }[] = [
    {
        name: "Belfry Tower of Bruges",
        coords: [51.208425, 3.224844],
        iconUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Star_%E2%80%93_Yellow.png"
    },
    {
        name: "Basilica of the Holy Blood",
        coords: [51.208261, 3.226576],
        iconUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Star_%E2%80%93_Yellow.png"
    },
    {
        name: "Church of Our Lady Bruges",
        coords: [51.204482, 3.224183],
        iconUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Star_%E2%80%93_Yellow.png"
    }
];

const BruggeMap: React.FC = () => {
  const [selectedHotels, setSelectedHotels] = useState<Hotel[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [routeData, setRouteData] = useState<{ routes: { geometry: { coordinates: [number, number][] } }[] } | null>(null);
  const [showRadii, setShowRadii] = useState(true);
  const [routeInfo, setRouteInfo] = useState<{[key: string]: RouteInfo}>({});

  const stationCoords: LatLngExpression = [51.19765672, 3.21775997];

  const radiusStyles = {
    oneKm: {
      color: 'rgba(255, 165, 0, 0.3)',
      fillColor: 'rgba(255, 165, 0, 0.1)',
      fillOpacity: 0.8
    },
    fiveKm: {
      color: 'rgba(255, 255, 224, 0.3)',
      fillColor: 'rgba(255, 255, 224, 0.1)',
      fillOpacity: 0.8
    }
  };

  const formatWalkingTime = (seconds: number) => {
    const minutes = Math.round(seconds / 60);
    return `${minutes} min walk`;
  };

  const formatDistance = (meters: number) => {
    if (meters < 1000) {
      return `${Math.round(meters)}m`;
    }
    return `${(meters / 1000).toFixed(1)}km`;
  };

  const toggleHotelSelection = (hotel: Hotel) => {
    setSelectedHotels(prev => {
      const isSelected = prev.find(h => h.name === hotel.name);
      if (isSelected) {
        return prev.filter(h => h.name !== hotel.name);
      } else {
        return [...prev, hotel];
      }
    });
  };

  return (
    <div className="w-full h-screen">
      <MapContainer
        center={[51.20723321390161, 3.2262636398086664]}
        zoom={14}
        minZoom={13}
        maxZoom={18}
        className="w-full h-full"
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
  url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaXFiamFwYW4iLCJhIjoiY202dTB5dzRsMDNkZDJpcXh6ZWE5amoxZSJ9.RuBBxE_1j7axzau7zDNM3g`}
  attribution='&copy; <a href="https://www.mapbox.com/">Mapbox</a> contributors'
/>

        
        {/* Station marker */}
        <Marker 
          position={stationCoords}
          icon={new Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41]
          })}
        >
          <Popup>
            <div className="font-bold">Brugge Railway Station</div>
          </Popup>
        </Marker>

        {/* Station walking radius circles */}
        <Circle
          center={stationCoords}
          radius={1000}
          pathOptions={radiusStyles.oneKm}
        >
          <Popup>1 km radius from station</Popup>
        </Circle>
        <Circle
          center={stationCoords}
          radius={5000}
          pathOptions={radiusStyles.fiveKm}
        >
          <Popup>5 km radius from station</Popup>
        </Circle>

        {/* Hotel markers and routes */}
        {hotels.map((hotel) => {
          const isSelected = selectedHotels.some(h => h.name === hotel.name);
          return (
            <React.Fragment key={hotel.name}>
              <Marker 
                key={hotel.name}
                position={hotel.coords}
                icon={new Icon({
                  iconUrl: hotel.rooms >= 90 
                    ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png'
                    : hotel.rooms >= 70
                      ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png'
                      : hotel.rooms >= 30
                        ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'
                        : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41]
                })}
                >
                    {/* Display hotel name when zoomed in */}
                    <Tooltip direction="top" offset={[0, -25]} opacity={1} permanent>
                        <span className="font-semibold text-xs">{hotel.name}</span>
                    </Tooltip>
               
            
                <Popup>
                  <div>
                    <h3 className="font-bold">{hotel.name}</h3>
                    <p>Rooms: {hotel.rooms}</p>
                    <p>Restaurants: {hotel.restaurants}</p>
                    <p className="text-sm text-gray-600">{hotel.address}</p>
                    {routeInfo[hotel.name] && (
                      <div className="text-sm text-gray-600">
                        <p>Distance: {formatDistance(routeInfo[hotel.name].distance)}</p>
                        <p>Walking time: {formatWalkingTime(routeInfo[hotel.name].duration)}</p>
                      </div>
                    )}
                    <a 
                      href={hotel.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 text-sm block mt-1"
                    >
                      Visit Website
                    </a>
                    <button
                      onClick={() => toggleHotelSelection(hotel)}
                      className="mt-2 text-sm text-blue-500"
                    >
                      {isSelected ? 'Hide route & radius' : 'Show route & radius'}
                    </button>
                  </div>
                </Popup>
              </Marker>
              {/* 🔹 Draw the Walking Route in Blue */}
{routeData && (
  <Polyline
    positions={routeData.routes[0].geometry.coordinates.map(([lng, lat]: [number, number]) => [lat, lng])}
    color="blue"
    weight={4}
    opacity={0.8}
  />
)}

{/* Add Historic Landmark Markers Below this line*/}
{historicLandmarks.map((landmark, index) => (
    <Marker
    key={index}
    position={landmark.coords}
    icon={new Icon({
        iconUrl: landmark.iconUrl,
        iconSize: [30, 45],
        iconAnchor: [15, 45]
    })}
    >
        {/* Custom tooltip with red and brown text */}
        <Tooltip direction="top" offset={[0, -30]} opacity={1} permanent>
            <div>
                <span className="font-semibold text-xs text-red-600">{landmark.name}</span>
                <br />
                <span className="text-xs text-brown-700">Historic Landmark</span>
            </div>
        </Tooltip>
        <Popup>
            <h3 className="font-bold">{landmark.name}</h3>
            <p className="text-sm text-gray-600">Historic landmark in Bruges</p>
        </Popup>
    </Marker>
))}

              {/* Walking routes and radius circles for selected hotels */}
              {isSelected && (
                <>
                  <StreetRouting
                    hotelCoords={hotel.coords}
                    onRouteData={(data) => {
                      setRouteInfo(prev => ({
                        ...prev,
                        [hotel.name]: data
                      }));
                    }}
                  />
                  {showRadii && (
                    <>
                      <Circle
                        center={hotel.coords}
                        radius={1000}
                        pathOptions={radiusStyles.oneKm}
                      >
                        <Popup>1 km radius from {hotel.name}</Popup>
                      </Circle>
                      <Circle
                        center={hotel.coords}
                        radius={5000}
                        pathOptions={radiusStyles.fiveKm}
                      >
                        <Popup>5 km radius from {hotel.name}</Popup>
                      </Circle>
                    </>
                  )}
                </>
              )}
            </React.Fragment>
          );
        })}
      </MapContainer>

      {/* Legend and Information */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg text-sm z-[1000] pointer-events-none">
        <h4 className="font-bold text-lg">Hotel Map for Bruges, Belgium</h4>
        <p className="text-xs">Created by Anmol for research</p>

        <h5 className="font-semibold mt-2">Legend:</h5>
        <div className="flex flex-col space-y-1 text-xs">
            <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                Small Hotel (&lt; 30 rooms)
            </div>
            <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                Medium Hotel (30-69 rooms)
            </div>
            <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                Large Hotel (70-89 rooms)
            </div>
            <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                Very Large Hotel (90+ rooms)
            </div>
        </div>
      </div>

      {/* Controls and Legend */}
      <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg">
        <h4 className="font-bold mb-2">Hotel Categories</h4>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
            <span>Small (&lt; 30 rooms)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span>Medium (30-69 rooms)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span>Large (70-89 rooms)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span>Very Large (90+ rooms)</span>
          </div>
        </div>

        {selectedHotels.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-bold mb-2">Selected Hotels</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {selectedHotels.map(hotel => (
                <div key={hotel.name} className="text-sm">
                  <p className="font-medium">{hotel.name}</p>
                  {routeInfo[hotel.name] && (
                    <>
                      <p className="text-gray-600">
                        Distance: {formatDistance(routeInfo[hotel.name].distance)}
                      </p>
                      <p className="text-gray-600">
                        Walking time: {formatWalkingTime(routeInfo[hotel.name].duration)}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 space-x-2">
          <button
            onClick={() => setSelectedHotels([])}
            className="text-sm text-blue-500"
          >
            Clear all
          </button>
          <button
            onClick={() => setShowRadii(!showRadii)}
            className="text-sm text-blue-500"
          >
            {showRadii ? 'Hide radii' : 'Show radii'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BruggeMap;