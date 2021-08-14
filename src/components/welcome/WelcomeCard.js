import React from 'react'
import DataService from '../../DataService'
import './welcome.css'
function WelcomeCard(props) {

    const handleDelete=()=>{
      DataService.deleteInterest(props.data[0].id).then((response)=>{
        //console.log(response);
        const newdata=props.alldata;
        const idx=newdata.indexOf(props.data[0].id)
        if (idx > -1) {
          newdata.splice(idx, 1);
        }
        //alert(newdata)
        console.log(newdata)  
        props.setState([...newdata]);
      }).catch((err)=>{
        console.log(err);
      })
    }

    return (
        <div>

<div className="card" id="customCard">
  <img className="card-img-top" src={props.data[0].src} alt="Card image cap"/>
  <div className="card-body">
    <h5 className="card-title">{props.data[0].subtitle}</h5>
    <p className="card-text">{props.data[0].desc}</p>
    <button className="btn btn-danger" onClick={handleDelete}>Delete Interest</button>
  </div>
</div>
                                    
        </div>
    )
}

export default WelcomeCard
