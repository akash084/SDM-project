import "./NavBar.css";
import { Icon } from "@iconify/react";

const NavBar = () => {
	return (
		<>
			<div className="nav">
				<Icon
					className="icon logo"
					icon="fa6-solid:compass-drafting"
					width={40}
					height={40}
				/>

				<form className="nav-search" action="">
					<input type="text" placeholder="Search for Project / People" />
					<button>
						<Icon
							className="icon"
							icon="tabler:search"
							width={20}
							height={20}
						/>
					</button>
				</form>
				<div className="nav-icons">
					<Icon className="icon" icon="cuida:user-outline" />
					<Icon className="icon" icon="eos-icons:project-outlined" />
					<Icon className="icon" icon="lets-icons:message" />
					<Icon className="icon" icon="material-symbols:dark-mode-outline" />
				</div>
			</div>
		</>
	);
};

export default NavBar;
