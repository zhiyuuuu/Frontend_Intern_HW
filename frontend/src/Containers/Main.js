import { useEffect, useState } from "react";
import { getIssues } from "../api";
import "../css/Main.css";
import DropDownMenu from "../Components/DropDown";
import Header from "./Header";

const MainPage = ({ render, setRender }) => {

	const [issues, setIssues] = useState([]);
	const [reverseOrder, setReverseOrder] = useState(false);
	const [state, setState] = useState("all");
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		async function importIssues(accessToken, page) {
			const data = await getIssues(accessToken, page);
			console.log('frontend issues', data);
			if (data.length === 0) {
				setHasMore(false)
			}
			setIssues([...issues, ...data]);
		}

		importIssues("Bearer " + localStorage.getItem("accessToken"), page)

		const handleScroll = () => {
			const scrollHeight = document.documentElement.scrollHeight;
			const scrollTop = document.documentElement.scrollTop;
			const clientHeight = document.documentElement.clientHeight;
			if (scrollTop + clientHeight >= scrollHeight) {
				setPage(page + 1);
			}
		};
		window.addEventListener('scroll', handleScroll);
	
		return () => {
		  window.removeEventListener('scroll', handleScroll);
		};
	}, [page])

	

  return(
	<div className="main-container">
		<Header setOrder={ setReverseOrder } 
			render={ render } 
			setRender={ setRender } 
			setState={ setState }/>
		<div className="tasks" style={
			reverseOrder?
				{flexDirection: "column-reverse"}:{flexDirection: "column"}}>
			{
				issues.map((task, i) => (
					<div className="task" 
						key={i} 
						style={
							(state === "all")?
								{display: "flex"}:task.state === state?
									{display: "flex"}:{display: "none"}
						}>
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
			{
				!hasMore && <p>There are no more issues!</p>
			}
    	</div>
	</div>
  )
}

export default MainPage;