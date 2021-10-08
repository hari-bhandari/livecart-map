import React, {useEffect, useState} from 'react';
import GoogleMapReact from 'google-map-react';
import useFetch from "./useFetch";
import ReactLoading from 'react-loading';
import {measure, sizes} from "./utils";
import Logo from "./MapCustomLogo/Logo";

const MyLocation = ({zoom}) => (
    <img src="https://res.cloudinary.com/wisecart/image/upload/v1633590498/location_js4dam.png" alt="My Location" style={{width:sizes[zoom]}} />
)
const zoomLevelIntoMetres = (zoomLevel) => {
  return (40000/(2**zoomLevel))*2000
} //calculates the width of map in metres

const Map = ({location,setLocation}) => {
    const [zoom, setZoom] = useState(14) //zoom

    // lat: 40.807537,
    //     lng: -73.962570
    const {loading, error, data} = useFetch(location.lat, location.lng, zoomLevelIntoMetres(zoom))
    const OnDragEnd = (map) => {
        const distance=measure(location.lat,location.lng,map.center.lat(),map.center.lng())
        console.log(distance)
        if(distance>1000){
            setLocation({lat:map.center.lat(),lng:map.center.lng()})
        }
    }
    // useEffect(() => {
    //     //to do list
    //     //make the range bigger if data is not found
    //     //zoom out map too.
    //     // if (data?.length === 0) { //only updates range when the array is empty
    //     //     if (range < range * 2) {
    //     //         setRange(range * 2) //doubling the range //distance
    //     //         setZoom(zoom - 2)
    //     //     }
    //     // }
    // }, [data])

    const handleApiLoaded = (map, maps,places) => {
        const bounds =new maps.LatLngBounds()
        console.log(bounds)
        // Fit map to bounds
        // Bind the resize listener
        // bindResizeListener(map, maps, bounds);

    };

    return (
        <div style={{height: '100vh', width: '100%'}}>
            {loading ?
                <ReactLoading type={'bars'} color={'green'} height={"500px"} width={"500px"} className={'loader'}/> :
                <GoogleMapReact
                    bootstrapURLKeys={{key: "AIzaSyDqKBrraOjqfaY818SB-kitBdIMFT662iE"}} //api
                    center={location}
                    zoom={zoom}
                    onDragEnd={(map) => OnDragEnd(map)}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                    onZoomAnimationEnd={(data)=>{
                        setZoom(data)
                    }
                    
                    }
                >
                    {data.map((data) => (
                        <Logo lat={data.coordinates[1]}
                              lng={data.coordinates[0]} data={data} zoom={zoom}/>
                    ))}
                    <MyLocation lat={location.lat} lng={location.lng} zoom={zoom}/>
                </GoogleMapReact>
            }
        </div>
    );
};

export default Map;