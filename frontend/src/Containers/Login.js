import '../css/Login.css';

const CLIENT_ID = "a578daa362dae8069c34";

function loginWithGitHub() {
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID + "&scope=repo")
}

const Login = () => {
    return(
        <div className="login-container">
            <div className="block">
                <div className="login-description">
                    <p>Login with your GitHub account</p>
                </div>
                <div className="login-button">
                    <button onClick={ loginWithGitHub }> Log in </button>
                    <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Login;