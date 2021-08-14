import React,{useState} from 'react'
import IntrestCard from './IntrestCard'
import DataService from '../../DataService'

export default function Intrest(props) { 
    
    const [selectedIntrest,setSelectedIntrest]=useState([]);   
    const handleClick=()=>{
        //alert(selectedIntrest);
        DataService.addIntrest(selectedIntrest).then((response)=>{
           // props.history.push(`/welcome`);
        }).catch((err)=>{
            //hashHistory.push(`/error`);
        });
    } 
    return (
        <div>
            <div className="container pb-5 mb-sm-1" id="content">
            
            <div className="row">
            <span id="styling">Choose Your Interests</span>
            <IntrestCard data={props.data[0].workout} state={selectedIntrest} setState={setSelectedIntrest}/>
             <IntrestCard data={props.data[1].mindfullness} state={selectedIntrest} setState={setSelectedIntrest}/>
            <IntrestCard data={props.data[2].familytime} state={selectedIntrest} setState={setSelectedIntrest}/>
            <IntrestCard data={props.data[3].music} state={selectedIntrest} setState={setSelectedIntrest}/>
           <IntrestCard data={props.data[4].Food} state={selectedIntrest} setState={setSelectedIntrest}/>
            <IntrestCard data={props.data[5].Relax} state={selectedIntrest} setState={setSelectedIntrest}/>
          
        </div>
        <a href="/welcome"><button type="button" className="btn btn-success" onClick={handleClick}>continue</button></a>
        </div>
        
        </div>
    )
}

