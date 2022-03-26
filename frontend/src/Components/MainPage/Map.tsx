import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { getLocations, getPostingById } from '../../Api';
import { IGetLocations } from '../../types/Interface';
import DetailPage from '../DetailSlidePage/DetailPage';
import mapPin from '../../images/map_pin.png';
import { PetInfoWindow } from './InfoWindow';

const containerStyle = {
  height: '100%',
};

export function Map() {
  const [selected, setSelected] = useState<Number | null | undefined>();
  const [location, setLocation] =
    useState<Pick<IGetLocations, 'lat' | 'lng'>>();
  const [results, setResult] = useState([]);
  const [postingInfo, setPostingInfo] = useState<any>();
  const [displayFlg, setdisplayFlg] = useState<Boolean>(false);
  const [pixelOffset, setPixelOffset] = useState<undefined | google.maps.Size>(
    undefined,
  );
  const [scaledSize, setScaledSize] = useState<undefined | google.maps.Size>(
    undefined,
  );

  const createSize = () => {
    setPixelOffset(new window.google.maps.Size(0, -15));
    setScaledSize(new window.google.maps.Size(35, 50));
  };

  async function getGeoLocation() {
    if (navigator.geolocation) {
      console.log('Locating...');
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        () => {
          setLocation({
            lat: 35.68183,
            lng: 139.76728,
          });
        },
      );
    }
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
    <div id="map" className="h-94/100 w-full">
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY || 'dummy'}
        onLoad={() => createSize()}
      >
        {/* map表示の初期値 */}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location}
          zoom={17}
          onClick={() => {
            setdisplayFlg(false);
          }}
        >
          {results.map((result: IGetLocations) => {
            return (
              <React.Fragment key={result.id}>
                <Marker
                  icon={{
                    url: mapPin,
                    scaledSize: scaledSize,
                  }}
                  position={{
                    lat: Number(result.lat),
                    lng: Number(result.lng),
                  }}
                  onClick={() => {
                    setSelected(null);
                    setSelected(result.id);
                    getPosting(result.id).then((res) => {
                      setPostingInfo(res);
                    });
                  }}
                >
                  {selected === result.id && postingInfo && (
                    <InfoWindow
                      options={{
                        pixelOffset: pixelOffset,
                      }}
                      onCloseClick={() => {
                        setdisplayFlg(false);
                        setSelected(null);
                      }}
                    >
                      <PetInfoWindow
                        setdisplayFlg={setdisplayFlg}
                        postingInfo={postingInfo}
                      />
                    </InfoWindow>
                  )}
                </Marker>
              </React.Fragment>
            );
          })}
        </GoogleMap>
      </LoadScript>
      {postingInfo && (
        <DetailPage displayFlg={displayFlg} postingInfo={postingInfo} />
      )}
    </div>
  );
}
