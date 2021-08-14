class AuthenticationService{

    save=(username)=>{
        
        sessionStorage.setItem('username',username);
    }

    isUserLoggedIn=()=>{
        let user= sessionStorage.getItem('username'); 
        if(user)
        {
            return true;
        }
        else
        return false;
    }
}
export default AuthenticationService
