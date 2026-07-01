import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '350px',
  borderRadius: '12px',
  marginTop: '20px'
};

const dhakaCenter = { lat: 23.8103, lng: 90.4125 };

// Approximate coordinates for known locations
const locationCoords = {
  "Mirpur 10":    { lat: 23.8073, lng: 90.3672 },
  "Mirpur 1":     { lat: 23.7934, lng: 90.3563 },
  "Science Lab":  { lat: 23.7401, lng: 90.3896 },
  "Dhanmondi 27": { lat: 23.7461, lng: 90.3742 },
  "Gulshan 1":    { lat: 23.7808, lng: 90.4142 },
  "Farmgate":     { lat: 23.7584, lng: 90.3899 },
  "Motijheel":    { lat: 23.7330, lng: 90.4176 },
  "Uttara North": { lat: 23.8759, lng: 90.3795 },
  "Banani":       { lat: 23.7937, lng: 90.4066 },
  "Gulistan":     { lat: 23.7237, lng: 90.4120 },
  "Sadarghat":    { lat: 23.7104, lng: 90.4074 },
  "Mohakhali":    { lat: 23.7799, lng: 90.4041 },
  "Dhanmondi":    { lat: 23.7461, lng: 90.3742 },
  "Gulshan 2":    { lat: 23.7925, lng: 90.4148 },
  "Old Dhaka":    { lat: 23.7104, lng: 90.4074 },
  "Gulshan":      { lat: 23.7808, lng: 90.4142 },
  "Bashundhara":  { lat: 23.8141, lng: 90.4275 },
};

const legColors = ['#0a3d62', '#e74c3c', '#27ae60', '#f39c12', '#8e44ad'];

function MapView({ legs }) {
  const points = [];
  legs.forEach(leg => {
    if (locationCoords[leg.from]) points.push(locationCoords[leg.from]);
    if (locationCoords[leg.to]) points.push(locationCoords[leg.to]);
  });

  const uniquePoints = points.filter(
    (p, i, arr) => i === 0 || p.lat !== arr[i - 1].lat
  );

  return (
    <LoadScript googleMapsApiKey="AIzaSyCYFSqjIi_kqymubekLaVUnvemPEsAMgUU">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={uniquePoints[0] || dhakaCenter}
        zoom={13}
      >
        {uniquePoints.map((pos, i) => (
          <Marker key={i} position={pos} label={`${i + 1}`} />
        ))}
        {legs.map((leg, i) => {
          const from = locationCoords[leg.from];
          const to = locationCoords[leg.to];
          if (!from || !to) return null;
          return (
            <Polyline
              key={i}
              path={[from, to]}
              options={{ strokeColor: legColors[i % legColors.length], strokeWeight: 4 }}
            />
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapView;