import React, {useRef, useState} from 'react';
import './Logo.css'
import useOnClickOutside from "../useOnClickOutside";
import {StoreTypeImagesData} from "../StoreTypeImagesData";

const Logo = ({data}) => {
    const [open, setOpen] = useState(false) //state for popup
    const ref = useRef();
    useOnClickOutside(ref, () => setOpen(() => false)); //closing popup when clicked somewhere else.

    const OnClick = () => {
        setOpen(!open)
    }

    return (
        <>
            <div className="holder" onClick={OnClick}>
                <img src={StoreTypeImagesData[data?.type]} alt={'our store location'}/>
                <div id="popup" className="popup" style={{display: `${open ? 'block' : 'none'}`}} ref={ref}>
                    <div className="content">
                        <img src={StoreTypeImagesData[data?.type]} alt={'our store location'}/>
                        <h4>{data.name}</h4>
                        <p>{data.neighborhood}</p>
                        <a href={`https://maps.google.com/?q=${data.coordinates[1]},${data.coordinates[0]}`}> Get Directions on Google maps</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Logo;