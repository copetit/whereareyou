import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { getLocations } from '../Api';
import { IGetLocations } from '../Types';

const containerStyle = {
  width: '1000px',
  height: '1000px',
};

function Map() {
  // default location (Tokyo Station)
  const [location, setLocation] = useState({ lat: 35.681345, lng: 139.767151 });
  const [results, setResult] = useState([]);

  async function getMap() {
    // get Current Location
    navigator.geolocation.getCurrentPosition(function (position) {
      const { latitude, longitude } = position.coords;
      setLocation({ lat: latitude, lng: longitude });
    });
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
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location}
          zoom={17}
        >
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
