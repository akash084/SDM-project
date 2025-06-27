import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { ProjectType } from "../Project/Project";

interface Props {
	authToken: string | null;
	searchResults: ProjectType[] | null;
}

const Home = ({ authToken, searchResults }: Props) => {
	const [projects, setProjects] = useState<ProjectType[]>([]);

	useEffect(() => {
		if (!searchResults) {
			axios
				.get("http://localhost:1337/api/projects", {
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				})
				.then((res) => {
					console.log("API Response:", res);
					const fetchedProjects = Array.isArray(res.data?.data)
						? res.data.data
						: [];
					setProjects(fetchedProjects);
				})
				.catch(() => {
					console.log("No Projects found");
				});
		}
	}, [authToken, searchResults]);

	const displayProjects = searchResults ?? projects;

	return (
		<>
			<div className="project">
				{/* {authToken} */}

				{displayProjects.length === 0 ? (
					<div className="no-projects-message">
						<p>No projects found. Click "Add Project" to create one!</p>
					</div>
				) : (
					displayProjects.map((project) => (
						<div className="project-description" key={project.id}>
							<div className="content">
								<div className="heading">{project.title}</div>
								<div className="properties">
									<li>
										<Icon icon="mdi:clock" width="16" height="16" />
										Posted on {project.createdAt.split("T")[0]}
										{/* Updated on {project.updatedAt} */}
									</li>
									<li>
										<Icon
											icon="material-symbols:space-dashboard"
											width="16"
											height="16"
										/>
										{project.memberSlots} Slots Remaining
									</li>
									<li>
										<Icon icon="mdi:location" width="16" height="16" />
										{project.country}
									</li>
								</div>
								<div className="description">{project.description}</div>
								<div className="tags">
									<li>{project.categories}</li>
									<li>{project.programmingLanguages}</li>
									<li>{project.frameworks}</li>
								</div>
							</div>
						</div>
					))
				)}
			</div>
		</>
	);
};

export default Home;
