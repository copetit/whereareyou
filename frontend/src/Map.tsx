import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { getLocations } from './Api';
import { IGetLocations } from './Types';

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
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getMap();
  }, []);

  return (
    <div>
      <LoadScript googleMapsApiKey="AIzaSyCiUYM3IVNVKzonJU9NStnOvZSW3f-yArs">
        {/* map表示の初期値 */}
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>
          {results.map((result: IGetLocations, i) => {
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
