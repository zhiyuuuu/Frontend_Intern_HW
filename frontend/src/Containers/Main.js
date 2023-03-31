import { useState } from "react";
import { getIssues } from "../api";
import "../css/Main.css";

const MainPage = ({ rerender, setRerender }) => {

  const [issues, setIssues] = useState([]);

  return(
	<div className="main-container">
		<div className="tasks">
      	{/* <h3>Logged in!</h3>
      	<button onClick={() => {
        	const data = getIssues("Bearer " + localStorage.getItem("accessToken"));
          	setIssues(data);
        }}>Get issue data</button>
      	<button onClick={() => {
        	localStorage.setItem("accessToken", "undefined");
        	setRerender(!rerender);
     	}}>Log out</button> */}
			<div className="task">
				<div className="state-row">
					<div className="task-state">Open</div>
					<div className="task-action">action</div>
				</div>
				<div className="task-title">Title</div>
				<div className="task-body">body</div>
			</div>
			{
				issues.map((task) => {
					<div className="task">
						<div className="task-state">{ task.state }</div>
						<div className="task-title">{ task.title }</div>
						<div className="task-body">{ task.body }</div>
						<div className="task-action"></div>
					</div>
				})
			}
    	</div>
	</div>
  )
}

export default MainPage;