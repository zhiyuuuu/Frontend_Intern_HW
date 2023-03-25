import { Button } from 'antd';
import '../css/Login.css';
import { useEffect } from 'react';

const CLIENT_ID = "a578daa362dae8069c34";

function loginWithGitHub() {
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID)
}

const Login = () => {
    return(
        <div className="login-container">
            <div className="block">
                <div className="login-description">
                    <p>Login with your GitHub account</p>
                </div>
                <div className="login-button">
                    <Button type='primary' onClick={ loginWithGitHub }> Log in </Button>
                </div>
            </div>
        </div>
    )
}

export default Login;