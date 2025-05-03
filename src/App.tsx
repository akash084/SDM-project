import { useEffect, useState } from "react";
import "./App.css";
import Account from "./components/Account/Account";
import Project from "./components/Project/Project";
import Message from "./components/Message/Message";
import NavBar from "./components/NavBar/NavBar";

type ActiveSection = "account" | "project" | "message" | null;

function App() {
	const [activeSection, setActiveSection] = useState<ActiveSection>(null);

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
			{activeSection === "account" && <Account />}
			{activeSection === "project" && <Project />}
			{activeSection === "message" && <Message />}
		</>
	);
}

export default App;
