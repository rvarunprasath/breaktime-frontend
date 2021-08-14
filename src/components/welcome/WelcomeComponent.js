import React,{useState,useEffect} from 'react'
import DataService from '../../DataService';
import Nav2 from '../navs/Nav2'
import Welcome from './Welcome'

function WelcomeComponent() {
    
    const [data,setData]=useState([]);

    useEffect(() =>{
        DataService.getInterest().then(
            (response)=>{
                //alert(response.data);
                setData(response.data);
            }
        ).catch((err)=>{

        })
    }, [])

    return (
        <div>
            <Nav2/>
            <div id="content">
            <Welcome data={data} setState={setData}/>
            </div>
        </div>
    )
}

export default WelcomeComponent