import React,{useState} from 'react'
import {data1} from '../../constants/constants';
import Nav2 from '../navs/Nav2'
import './intrest.css'
import Intrest from './Intrest';
function IntrestComponent() {
    
    const [data,setData]=useState(data1);

    return (
        <div>
            <Nav2/>
            
            <Intrest data={data}/>
            
        </div>
    )
}

export default IntrestComponent
