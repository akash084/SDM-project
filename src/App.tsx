import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Account from "./components/Account/Account";
import Project from "./components/Project/Project";
import Message from "./components/Message/Message";
import NavBar from "./components/NavBar/NavBar";

type ActiveSection = "account" | "project" | "message" | null;

function App() {
	const [authToken, setAuthToken] = useState<string | null>(null);

	const [activeSection, setActiveSection] = useState<ActiveSection>(null);

	console.log(authToken);

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
			<NavBar navControl={navControl} />
			{activeSection === "account" && (
				<Account onTokenReceived={setAuthToken} />
			)}

			{activeSection === "project" && <Project authToken={authToken} />}
			{activeSection === "message" && <Message />}
			<ToastContainer />
		</>
	);
}

export default App;
