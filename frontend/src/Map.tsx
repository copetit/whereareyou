import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '1000px',
  height: '1000px',
};

const center = {
  lat: 35.69575,
  lng: 139.77521,
};
const positionAkiba = {
  lat: 35.69731,
  lng: 139.7747,
};

const positionIwamotocho = {
  lat: 35.69397,
  lng: 139.7762,
};
// const configValue: string = process.env.GOOGLE_API_KEY;

function Map() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyCiUYM3IVNVKzonJU9NStnOvZSW3f-yArs">
      {/* <LoadScript googleMapsApiKey={configValue}> */}
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>
        <Marker position={positionAkiba} />
        <Marker position={positionIwamotocho} />
        <></>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(Map);
