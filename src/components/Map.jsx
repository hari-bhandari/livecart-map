import React, {useEffect, useState} from 'react';
import GoogleMapReact from 'google-map-react';
import Logo from "./MapCustomLogo/Logo";
import useFetch from "./useFetch";
import ReactLoading from 'react-loading';

const MyLocation = () => (
    <img src="https://res.cloudinary.com/wisecart/image/upload/v1633590498/location_js4dam.png" alt="My Location"/>
)


const Map = ({location}) => {
    const [range, setRange] = useState(24932)//range
    const [zoom, setZoom] = useState(11) //zoom
    // lat: 40.807537,
    //     lng: -73.962570
    const {loading, error, data} = useFetch(location.lat, location.lng, range)
    const OnDragEnd = (map) => {
        console.log(map.center.lat(), map.center.lng()) //new center when user drags the map
    }
    useEffect(() => {
        //to do list
        //make the range bigger if data is not found
        //zoom out map too.
        // if (data?.length === 0) { //only updates range when the array is empty
        //     if (range < range * 2) {
        //         setRange(range * 2) //doubling the range //distance
        //         setZoom(zoom - 2)
        //     }
        // }
    }, [data])

    return (
        <div style={{height: '100vh', width: '100%'}}>
            {loading ?
                <ReactLoading type={'bars'} color={'green'} height={"500px"} width={"500px"} className={'loader'}/> :
                <GoogleMapReact
                    bootstrapURLKeys={{key: "AIzaSyDqKBrraOjqfaY818SB-kitBdIMFT662iE"}} //api
                    center={location}
                    defaultZoom={zoom}
                    onDragEnd={(map) => OnDragEnd(map)}
                    yesIWantToUseGoogleMapApiInternals
                    onChildClick={(id) => {
                        console.log({id})
                    }}
                >
                    {data.map((data) => (
                        <Logo lat={data.coordinates[1]}
                              lng={data.coordinates[0]} data={data}/>
                    ))}
                    <MyLocation lat={location.lat} lng={location.lng}/>
                </GoogleMapReact>
            }
        </div>
    );
};

export default Map;