import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { getLocations, getPostingById } from '../Api';
import { IGetLocations } from '../Types';

const containerStyle = {
  height: '100%',
};

function Map() {
  const [selected, setSelected] = useState<Number | null>();
  const [location, setLocation] =
    useState<Pick<IGetLocations, 'lat' | 'lng'>>();
  const [results, setResult] = useState([]);
  const [postingInfo, setPostingInfo] = useState<any>();

  async function getGeoLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
      const { latitude, longitude } = position.coords;
      setLocation({ lat: latitude, lng: longitude });
    });
  }
  async function getPosting(id: Number) {
    try {
      const [response] = await getPostingById(id);
      return response;
    } catch (error) {
      console.error(error);
    }
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
    <div id="map" className="h-92/100 w-full">
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
          {results.map((result: IGetLocations) => {
            return (
              <Marker
                key={result.id}
                position={{
                  lat: Number(result.lat),
                  lng: Number(result.lng),
                }}
                onClick={() => {
                  setSelected(result.id);
                  getPosting(result.id).then((res) => {
                    setPostingInfo(res);
                  });
                }}
              >
                {/* MarkerをクリックするとinfoWindowが表示される */}
                {selected === result.id && postingInfo && (
                  <InfoWindow
                    onCloseClick={() => {
                      setSelected(null);
                    }}
                  >
                    <>
                      {/* {result.id}の情報 */}
                      <div className="mini-profile flex max-h-72 max-w-lg">
                        <div className="img">
                          <img src={`${postingInfo.contents.imageUrl[0]}`} />
                        </div>
                        <div className="profile-text">
                          <p className="text-2xl mb-4">
                            {postingInfo.PetName}ちゃん
                          </p>
                          <p className="h-3/5 overflow-hidden">
                            {postingInfo.PetInfo}
                          </p>
                        </div>
                      </div>
                      <p className="absolute bottom-3 right-3">
                        {new Date(postingInfo.LostDate).toLocaleDateString()}
                      </p>
                    </>
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

export default Map;
