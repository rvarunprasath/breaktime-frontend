import React,{useRef} from 'react'
import { images } from '../../constants/constants';
import WelcomeCard from './WelcomeCard'
import EmptyComponent from './EmptyComponent'
import './welcome.css'
class Welcome extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            subscribeDisabled: false
        }
        this.publicSigningKey='';
        this.checkSubscription = this.checkSubscription.bind(this);
        this.init = this.init.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.unsubscribe = this.unsubscribe.bind(this);
    }

    async checkSubscription(){
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        if (subscription) {
        console.info('Subscription: ',subscription.endpoint);
        //    localStorage.setItem('Subscription',subscription.endpoint);
            const response = await fetch("http://localhost:8080/isSubscribed", {
            method: 'POST',
            body: JSON.stringify({endpoint: subscription.endpoint}),
            headers: {
                "content-type": "application/json"
            }
            });
            const subscribed = await response.json();

            if (subscribed) {
                console.log('Subscription: ',subscription.endpoint);
                this.setState({
                    subscribeDisabled: true
                });
            }
            return subscribed;
        }
        return false;
    }
    
    async init(){
        fetch('http://localhost:8080/publicSigningKey')
        .then(response => response.arrayBuffer())
        .then(key => this.publicSigningKey = key)
        .finally(() => console.info(this.publicSigningKey,'Application Server Public Key fetched from the server'));
    
        await navigator.serviceWorker.register("/sw.js", {
        scope: "/"
        });

        await navigator.serviceWorker.ready;
        console.info('Service Worker has been installed and is ready');
    }

    async subscribe(){
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: this.publicSigningKey
        });

        console.info(`Subscribed to Push Service: ${subscription.endpoint}`);
        localStorage.setItem('endpoint',JSON.stringify(subscription.endpoint));

        await fetch("http://localhost:8080/subscribe", {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
            "content-type": "application/json"
            }
        });

        console.info('Subscription info sent to the server');
        this.setState({
            subscribeDisabled: true
        }); 
    }

    async unsubscribe(){
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        if (subscription) {
            const successful = await subscription.unsubscribe();
            if (successful) {
            console.info('Unsubscription successful');

            await fetch("http://localhost:8080/unsubscribe", {
                method: 'POST',
                body: JSON.stringify({endpoint: subscription.endpoint}),
                headers: {
                "content-type": "application/json"
                }
            });

        console.info('Unsubscription info sent to the server');
        
        this.setState({
            subscribeDisabled: false
        }); 
        }
            else {
                console.error('Unsubscription failed');
            }
        }
    }
    
    componentDidMount(){
        if ("serviceWorker" in navigator) {
            try {
	            this.checkSubscription();
                this.init();
            } catch (e) {
                console.error('error init(): ' + e);
            }
        }
    }
    
 render(){
    return (
        <>
            <h1>Your Intrests</h1>
            <span>
            <button className="btn btn-success" id="subscribeButton" 
                        disabled={this.state.subscribeDisabled}
                        onClick={()=>{
                            this.subscribe().catch(e => {
                            if (Notification.permission === 'denied') {
                                console.warn('Permission for notifications was denied');
                            } else {
                                console.error('error subscribe(): ' + e);
                            }
                        });
                            this.setState({
                                subscribeDisabled: !this.state.subscribeDisabled 
                            });
                        }}
                        >Subscribe</button>
                <button className="btn btn-warning" id="unsubscribeButton" 
                    disabled={!this.state.subscribeDisabled}
                    onClick={()=>{
                        this.unsubscribe().catch(e => console.error('error unsubscribe(): ' + e));
                    }}
                    >Unsubscribe</button>
            </span>
                    <div className="head">
                        {
                            (this.props.data.length===0)?<EmptyComponent/>:this.props.data.map((i,k)=> {
                                var f = images.filter(obj => { return obj.id === i })
                                if(f.length===1)
                                 return (
                                    <WelcomeCard key={k} data={f} alldata={this.props.data} setState={this.props.setState}/>
                                    )
                            })
                        }
                    </div>
                    <div className="back">
                    <a href="/chooseIntrest"><button type="button" class="btn btn-info">Back To Interests</button></a>

                    </div>
        </>
    )
 }
    
}

export default Welcome