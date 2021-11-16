import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '1000px',
  height: '1000px',
};

const center = {
  lat: 35.73805386139952,
  lng: 139.6538817110336,
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
  const [result, setResult] = useState(center);
  useEffect(() => {
    const getLocations = async () => {
      const response = await axios
        .get('http://localhost:4000/v1/wau/locations')
        .then((response) => {
          setResult(response.data);
        });
    };
    getLocations();
  }, []);
  return (
    <div>
      <LoadScript googleMapsApiKey="AIzaSyCiUYM3IVNVKzonJU9NStnOvZSW3f-yArs">
        {/* <LoadScript googleMapsApiKey={configValue}> */}
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>
          {/* {console.log(result)} */}
          {console.log(result[0].lat)}
          {console.log(result[0].lng)}
          <Marker
            position={{
              lat: Number(result[0].lat),
              lng: Number(result[0].lng),
            }}
          />
          {/* {result.forEach((el) => {
            console.log(el.lat, el.lng);
            <Marker position={(el.lat, el.lan)} />;
          })} */}

          <Marker position={positionIwamotocho} />
          <></>
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default React.memo(Map);
