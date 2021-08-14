import React, { useState } from "react";
import DataService from '../../DataService'
import Nav1 from '../navs/Nav1';
export default function SignupComponent(props) {
    
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const handleClick=(event)=>{
        //alert(firstName+" "+lastName+" "+email+" "+password);
        DataService.create(firstName,lastName,email,password).then(
            (response)=>{
                if(response.data){
                    sessionStorage.setItem('username',email);
                    }   
                    //redirect to welcome page
                    if(sessionStorage.getItem('username'))
                    {
                        // const islog=(sessionStorage.getItem("username"))?true:false;
                        // alert(islog);
                        
                        props.history.push(`/chooseIntrest`);
                    }
                    else{
                        props.history.push(`/error`);
                    }
            }
        ).catch((error)=>{
            console.log(error);
        });
        event.preventDefault();   
    }
        return (<>
        <Nav1/>
            <div className="outer">
            <div className="inner">

            <form onSubmit={handleClick}>
                <h3>Register</h3>

                <div className="form-group m-2">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" value={firstName} onChange={(event)=>{setFirstName(event.target.value)}}/>
                </div>

                <div className="form-group m-2">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name"  value={lastName} onChange={(event)=>{setLastName(event.target.value)}}/>
                </div>

                <div className="form-group m-2">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(event)=>{setEmail(event.target.value)}}/>
                </div>

                <div className="form-group m-2">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(event)=>{setPassword(event.target.value)}}/>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block m-2">Register</button>
            </form>
            </div></div></>
        );
    }
