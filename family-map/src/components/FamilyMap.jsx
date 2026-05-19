import { useEffect, useMemo } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Carto Voyager — clean, Google Maps–like basemap
const MAP_TILES =
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

const familyIcon = (active, count) =>
  L.divIcon({
    className: "",
    html: `<span class="map-pin${active ? " map-pin--active" : ""}" data-count="${count}"></span>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

function FitBounds({ locations, selectedLocation }) {
  const map = useMap();

  useEffect(() => {
    if (selectedLocation) {
      map.flyTo([selectedLocation.lat, selectedLocation.lng], 12, {
        duration: 0.7,
      });
      return;
    }
    if (locations.length === 0) return;
    const bounds = L.latLngBounds(
      locations.map((loc) => [loc.lat, loc.lng]),
    );
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 5 });
  }, [locations, selectedLocation, map]);

  return null;
}

export default function FamilyMap({
  locations,
  selectedLocation,
  onSelectLocation,
}) {
  const center = useMemo(() => {
    if (locations.length === 0) return [31.5, 34.8];
    const lat =
      locations.reduce((sum, l) => sum + l.lat, 0) / locations.length;
    const lng =
      locations.reduce((sum, l) => sum + l.lng, 0) / locations.length;
    return [lat, lng];
  }, [locations]);

  return (
    <section className="map-wrap" aria-label="מפת העולם">
      <MapContainer
        center={center}
        zoom={3}
        minZoom={2}
        maxZoom={18}
        className="family-map"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url={MAP_TILES}
          subdomains="abcd"
          maxZoom={20}
        />
        <FitBounds locations={locations} selectedLocation={selectedLocation} />
        {locations.map((loc) => {
          const isActive = selectedLocation?.id === loc.id;
          return (
            <Marker
              key={loc.id}
              position={[loc.lat, loc.lng]}
              icon={familyIcon(isActive, loc.familyCount)}
              eventHandlers={{
                click: () => onSelectLocation(loc),
              }}
            >
              <Popup>
                <strong>{loc.address?.split(",")[0] || loc.name}</strong>
                <br />
                {loc.familyCount} משקי בית · {loc.memberCount} אנשים
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </section>
  );
}
