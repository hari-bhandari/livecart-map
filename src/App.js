import './App.css';
import Map from "./components/Map";

import './Button.css'
import React, {useState} from "react";

function App() {
    const [location, setLocation] = useState({
        lat: 40.807537,
        lng: -73.962570
    }) //initial geolocation
    const getGeoLocation = () => {
        if ("geolocation" in navigator) { //checking if geolocation is available on navigator
            navigator.geolocation.getCurrentPosition(function (position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                console.log(lat, lng)
                setLocation({lat, lng})
            }, (error) => {
                console.log(error)
            }, {timeout: 10000}) //setting timeout after every click
        } else {
            alert('GeoLocation not available on your browser')
        }
    }
    return (
        <div className="App">
            <Map location={location} setLocation={setLocation}/>
            <button className="custom-btn btn" onClick={getGeoLocation}>Use My Location</button>
        </div>
    );
}

export default App;
