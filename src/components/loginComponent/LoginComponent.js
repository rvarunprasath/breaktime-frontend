import React, {useState } from "react";
import DataService from '../../DataService'
import './login.css'
import Nav1 from '../navs/Nav1';

export default function LoginComponent(props){
     
    
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [message,setMessage]=useState("");
    
   

    const loginClicked=(event)=>{
        //alert(username+" "+password);
        DataService.verify(username,password).then(
            (response)=>{
                
                //add him to local storage
                if(response.data){
                sessionStorage.setItem('username',username);
                }   
                //redirect to welcome page
                if(sessionStorage.getItem('username'))
                {
                    //alert(true);
                    props.history.push(`/welcome`);
                }
                else{
                    setMessage("Invalid Credentials");
                }
                
            }
        ).catch(
            (error)=>{
                props.history.push(`/error`);
            }
        );
        event.preventDefault();    
    }
    
    return (
        <>
        <Nav1/>
        <div className="outer">
        <div className="inner"> 
            <form onSubmit={loginClicked}>
                <h3>Log in</h3>
                <h5 id="message">{message}</h5>
                <div className="form-group m-2">
                    <label>Email</label> 
                    <input type="email" name="email" className="form-control" placeholder="Enter email" value={username} onChange={(event)=>{setUsername(event.target.value)}} />
                </div>

                <div className="form-group m-2">
                    <label>Password</label>
                    <input type="password" value={password} className="form-control" placeholder="Enter password" onChange={(event)=>{setPassword(event.target.value)}}/>
                </div>


                <button type="submit" className="btn btn-dark btn-lg btn-block m-2">Sign in</button>
               
            </form>
            </div></div></>
        );
    }


