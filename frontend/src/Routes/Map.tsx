import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { getLocations } from '../Api';
import { IGetLocations } from '../Types';

const containerStyle = {
  width: '1000px',
  height: '1000px',
};

// dummyのinfowindowデザイン
const divStyle = {
  border: `1px solid #ccc`,
  padding: 15,
};

function Map() {
  const [selected, setSelected] = useState<Number | null>();
  const [location, setLocation] = useState<IGetLocations>();
  const [results, setResult] = useState([]);

  // Get Current Location
  async function getGeoLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
      const { latitude, longitude } = position.coords;
      setLocation({ lat: latitude, lng: longitude });
    });
  }
  async function getMap() {
    try {
      const response = await getLocations();
      setResult(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getGeoLocation();
    getMap();
  }, []);

  return (
    <div>
      <div className="text-indigo-600 font-bold underline">Where Are you</div>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY || 'dummy'}
      >
        {/* map表示の初期値 */}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location}
          zoom={17}
          onClick={(e) => {
            console.log(JSON.stringify(e.latLng!.toJSON()));
          }}
        >
          {results.map((result: IGetLocations, i) => {
            return (
              <Marker
                key={i}
                position={{ lat: Number(result.lat), lng: Number(result.lng) }}
                onClick={() => {
                  setSelected(i);
                }}
              >
                {/* MarkerをクリックするとinfoWindowが表示される */}
                {selected === i && (
                  <InfoWindow
                    onCloseClick={() => {
                      setSelected(null);
                    }}
                  >
                    <div style={divStyle}>
                      <span>Something {i}</span>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            );
          })}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default React.memo(Map);
