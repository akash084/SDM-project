import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Account from "./components/Account/Account";
import { ProjectType } from "./components/Project/Project";
import Project from "./components/Project/Project";
import Message from "./components/Message/Message";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";

type ActiveSection = "account" | "project" | "message" | null;

function App() {
	const [authToken, setAuthToken] = useState<string | null>(null);
	const [loginStatus, setLoginStatus] = useState<boolean | null>(false);

	const [activeSection, setActiveSection] = useState<ActiveSection>(null);
	const [searchResults, setSearchResults] = useState<ProjectType[] | null>(
		null
	);

	console.log(authToken);

	useEffect(() => {
		if (activeSection === "account") {
			setSearchResults((prev) => prev ?? null);
		}
	}, [activeSection]);

	useEffect(() => {
		if (activeSection === null) {
			setActiveSection("account");
		}
	}, [activeSection]);

	const navControl = {
		activeSection,
		setActiveSection,
	};
	return (
		<>
			<NavBar
				navControl={navControl}
				authToken={authToken}
				setSearchResults={setSearchResults}
			/>
			{(activeSection === "account" && loginStatus === false && (
				<Account onTokenReceived={setAuthToken} onLoggedIn={setLoginStatus} />
			)) ||
				(activeSection === "account" && loginStatus === true && (
					<Home authToken={authToken} searchResults={searchResults}></Home>
				))}

			{activeSection === "project" && <Project authToken={authToken} />}
			{activeSection === "message" && <Message />}
			<ToastContainer />
		</>
	);
}

export default App;
