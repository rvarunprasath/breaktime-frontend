import React from 'react'
import './intrest.css'
function IntrestCard(props) {
    
    const handleClick=(id)=>{
        props.setState([...props.state,id]);
        document.getElementById(id).style.border="5px solid green";

    }

    return (
        <div className="col-md-4 col-sm-6">
            <div className="card border-0 mb-grid-gutter">
                <div className="card-img-tiles">
                    <div className="thumblist">
                    <img title={props.data[0].subtitle} src={props.data[0].gifs1} alt="workout" id={props.data[0].id} onClick={(event)=>handleClick(event.target.id)}/>
                 
                    <img title={props.data[1].subtitle} src={props.data[1].gifs2} alt="workout" id={props.data[1].id} onClick={(event)=>handleClick(event.target.id)}/>
           
                    </div>
                    <div className="thumblist">
                        <img title={props.data[2].subtitle} src={props.data[2].gifs3} alt="workout" id={props.data[2].id} onClick={(event)=>handleClick(event.target.id)}/>
                    <img title={props.data[3].subtitle} src={props.data[3].gifs4} alt="workout" id={props.data[3].id} onClick={(event)=>handleClick(event.target.id)}/></div>
                </div>
                <div className="card-body border mt-n1 py-4 text-center">
                    <h2 className="h5 mb-1">{props.data[0].maintitle}</h2>
                </div>
            </div>
        </div>

    )
    
}

export default IntrestCard