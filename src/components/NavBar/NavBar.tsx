import { FieldValues, useForm } from "react-hook-form";

import "./NavBar.css";
import { Icon } from "@iconify/react";

interface Props {
	navControl: {
		activeSection: "account" | "project" | "message" | null;
		setActiveSection: (
			section: "account" | "project" | "message" | null
		) => void;
	};
}

const NavBar = ({ navControl }: Props) => {
	const { activeSection, setActiveSection } = navControl;

	const handleClick = (section: "account" | "project" | "message") => {
		if (activeSection === section) {
			setActiveSection(null); // If clicked again, close it
		} else {
			setActiveSection(section);
		}
	};

	const onSubmit = (data: FieldValues) => console.log(data);
	const { register, handleSubmit } = useForm();

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
						{...register("searched")}
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
