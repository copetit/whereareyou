import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { getLocations, IGetLocations } from './Api';

const containerStyle = {
  width: '1000px',
  height: '1000px',
};

const center = {
  lat: 35.738054,
  lng: 139.653882,
};

function Map() {
  const [results, setResult] = useState([center]);
  async function getMap() {
    try {
      const response = await getLocations();
      setResult(response);
    } catch (error) {}
  }
  useEffect(() => {
    getMap();
  }, []);

  return (
    <div>
      <LoadScript googleMapsApiKey="AIzaSyCiUYM3IVNVKzonJU9NStnOvZSW3f-yArs">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>
          {results.map((result: IGetLocations, i) => {
            console.log(typeof result.lat);
            return (
              <Marker
                key={i}
                position={{ lat: Number(result.lat), lng: Number(result.lng) }}
              />
            );
          })}
          <></>
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default React.memo(Map);
