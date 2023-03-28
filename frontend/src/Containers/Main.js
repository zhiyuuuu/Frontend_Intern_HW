const MainPage = () => {

    async function getUserData() {
        await fetch("http://localhost:4000/getUserData", {
          method: "GET",
          headers: {
            "Authorization": "Bearer" + localStorage.getItem("accessToken")
          }
        }).then((response) => {
          return response.json();
        }).then((data) => {
          console.log(data);
        })
    }

    return(
        <>
            <h3>Logged in!</h3>
            <button onClick={getUserData()}>Get user data</button>
        </>
    )
}

export default MainPage;