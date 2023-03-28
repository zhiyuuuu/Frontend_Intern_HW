import Login from './Containers/Login';
import MainPage from './Containers/Main';
import { useEffect, useState } from 'react';
import { getGitHubToken } from './api';

function App() {
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    const qString = window.location.search;
    const urlParam = new URLSearchParams(qString);
    const codeParam = urlParam.get("code");
    console.log(codeParam);

    //local storage
    if (codeParam && (localStorage.getItem("accessToken") === null)) {
      async function getAccessToken() {
        await getGitHubToken(codeParam).then((data) => {
          console.log('data in frontend', data); 
          //string type : access_token=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&scope=&token_type=bearer
          const tokenStr = data.substr(13);
          console.log('token content', tokenStr);
          if (tokenStr.length > 0) {
            localStorage.setItem("accessToken", tokenStr);
            setRerender(!rerender);
            console.log('set local storage');
          }
        })
      }
      getAccessToken(); 
    }
  }, []);

  return (
    <div className="App">
      {/* <Login/> */}
      {
        localStorage.getItem('accessToken') ?
        <MainPage />:<Login />
      }
    </div>
  );
}

export default App;
