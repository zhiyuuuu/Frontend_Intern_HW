import { useEffect, useState } from "react";
import { getIssues } from "../api";
import "../css/Main.css";
import DropDownMenu from "../Components/DropDown";
import Header from "./Header";

const MainPage = ({ render, setRender }) => {

  const [issues, setIssues] = useState([]);
  const [reverseOrder, setReverseOrder] = useState(false);

  useEffect(() => {
	async function importIssues(accessToken) {
		const data = await getIssues(accessToken);
		console.log('frontend issues', data);
		setIssues(data);
	}
	importIssues("Bearer " + localStorage.getItem("accessToken"))
  }, [])

  return(
	<div className="main-container">
		<Header setOrder={ setReverseOrder } render={ render } setRender={ setRender }/>
		<div className="tasks" style={
			reverseOrder?
				{flexDirection: "column-reverse"}:{flexDirection: "column"}}>
			<div className="task">
				<div className="state-row">
					<div className="task-state">Open</div>
					<div className="task-action">
						<DropDownMenu />
					</div>
				</div>
				<div className="task-title">Title</div>
				<div className="task-body">body</div>
			</div>
			{
				issues.map((task, i) => (
					<div className="task" key={i}>
						<div className="state-row">
							<div className="task-state">{ task.state }</div>
							<div className="task-action">
								<DropDownMenu />
							</div>
						</div>
						<div className="task-title">{ task.title }</div>
						<div className="task-body">{ task.body }</div>
					</div>
				))
			}
    	</div>
	</div>
  )
}

export default MainPage;