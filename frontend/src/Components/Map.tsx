import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { getLocations, getPostingById } from '../Api';
import { IGetLocations } from '../types/Interface';
import DetailPage from './DetailPage';
import { ReactComponent as Arrow } from '../images/btn_arrow_icon.svg';
import mapPin from '../images/map_pin.png';
import { Button } from './Button';

const containerStyle = {
  height: '100%',
};

function Map() {
  const [selected, setSelected] = useState<Number | null>();
  const [location, setLocation] =
    useState<Pick<IGetLocations, 'lat' | 'lng'>>();
  const [results, setResult] = useState([]);
  const [postingInfo, setPostingInfo] = useState<any>();
  const [displayFlg, setdisplayFlg] = useState<Boolean>(false);

  async function getGeoLocation() {
    if (navigator.geolocation) {
      // TODO 位置情報許可の窓が表示されるタイミングなので、Loading中だと表示させる
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
    <div id="map" className="h-92/100 w-full">
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY || 'dummy'}
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
                    scaledSize: new window.google.maps.Size(38, 55),
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
                  {/* MarkerをクリックするとinfoWindowが表示される */}
                  {selected === result.id && postingInfo && (
                    <InfoWindow
                      options={{
                        pixelOffset: new window.google.maps.Size(0, -15),
                      }}
                      onCloseClick={() => {
                        setdisplayFlg(false);
                        setSelected(null);
                      }}
                    >
                      <>
                        {/* {result.id}の情報 */}
                        <div className="mini-profile min-h-profileCard min-w-profileCard flex max-w-3xl max-h-96">
                          <div className="img">
                            <img
                              className="object-cover w-full h-full relative -left-8 rounded-br-profileCard"
                              src={`${process.env.REACT_APP_API_URL}/${postingInfo.contents.imageUrl[0]}`}
                              alt="pet"
                            />
                          </div>
                          <div className="profile-text py-4 pr-4 relatvie">
                            <p className="font-semibold text-3xl mb-4 overflow-hidden whitespace-nowrap overflow-ellipsis">
                              {postingInfo.PetName}
                            </p>
                            <p className="h-3/5 overflow-scroll break-words">
                              {postingInfo.PetInfo}
                            </p>
                            <Button
                              classList="detail-page-btn"
                              value={<Arrow />}
                              onClick={() => {
                                setdisplayFlg(true);
                              }}
                              btnColor="bg-yellow-400"
                            />
                          </div>
                        </div>
                        <p className="absolute bottom-3 right-3 text-gray-500">
                          {new Date(postingInfo.LostDate).toLocaleDateString()}
                        </p>
                      </>
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

export default Map;
