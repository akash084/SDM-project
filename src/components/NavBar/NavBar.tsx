import { FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import "./NavBar.css";
import { Icon } from "@iconify/react";
import { ProjectType } from "../Project/Project";

interface Props {
	authToken: string | null;
	navControl: {
		activeSection: "account" | "project" | "message" | null;
		setActiveSection: (
			section: "account" | "project" | "message" | null
		) => void;
	};
	setSearchResults: React.Dispatch<React.SetStateAction<ProjectType[] | null>>;
}

const NavBar = ({ navControl, authToken, setSearchResults }: Props) => {
	const { activeSection, setActiveSection } = navControl;

	const handleClick = (section: "account" | "project" | "message") => {
		if (activeSection === section) {
			setActiveSection(null);
			setSearchResults(null); // If clicked again, close it
		} else {
			setActiveSection(section);
			setSearchResults(null);
		}
	};

	const onSubmit = (data: FieldValues) => {
		console.log(data);
		axios
			.post("http://localhost:1337/api/project/search", data, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			})
			.then((res) => {
				console.log(res.data.data);
				setSearchResults(res.data.data);
				navControl.setActiveSection("account");
				reset();
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const { register, handleSubmit, reset } = useForm();

	return (
		<>
			<div className="nav">
				<Icon
					className="icon logo"
					icon="fa6-solid:compass-drafting"
					width={40}
					height={40}
				/>

				<form className="nav-search" onSubmit={handleSubmit(onSubmit)}>
					<input
						{...register("search")}
						type="text"
						placeholder="Search for Project / People"
					/>
					<button type="submit">
						<Icon className="icon" icon="tabler:search" />
					</button>
				</form>
				<div className="nav-icons">
					{activeSection === "account" ? (
						<Icon
							className="icon is-active"
							icon="cuida:user-outline"
							onClick={() => handleClick("account")}
						/>
					) : (
						<Icon
							className="icon"
							icon="cuida:user-outline"
							onClick={() => handleClick("account")}
						/>
					)}

					{activeSection === "project" ? (
						<Icon
							className="icon is-active"
							icon="eos-icons:project-outlined"
							onClick={() => handleClick("project")}
						/>
					) : (
						<Icon
							className="icon"
							icon="eos-icons:project-outlined"
							onClick={() => handleClick("project")}
						/>
					)}

					{activeSection === "message" ? (
						<Icon
							className="icon is-active"
							icon="lets-icons:message"
							onClick={() => handleClick("message")}
						/>
					) : (
						<Icon
							className="icon"
							icon="lets-icons:message"
							onClick={() => handleClick("message")}
						/>
					)}

					<Icon className="icon" icon="iconamoon:notification" />
					<Icon className="icon" icon="material-symbols:dark-mode-outline" />
				</div>
			</div>
		</>
	);
};

export default NavBar;
