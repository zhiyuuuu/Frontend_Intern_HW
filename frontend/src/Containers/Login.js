import { Button } from 'antd';
import '../css/Login.css';

const Login = () => {
    return(
        <div className="login-container">
            <div className="block">
                <div className="login-description">
                    <p>Login with your GitHub account</p>
                </div>
                <div className="login-button">
                    <Button type='primary'> Log in </Button>
                </div>
            </div>
        </div>
    )
}

export default Login;