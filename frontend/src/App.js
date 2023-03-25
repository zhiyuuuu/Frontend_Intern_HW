import Login from './Containers/Login';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    const qString = window.location.search;
    const urlParam = new URLSearchParams(qString);
    const codeParam = urlParam.get("code");
    console.log(codeParam);
}, [])

  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
