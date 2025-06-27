import { useEffect, useState } from "react";
import AddProject from "../AddProject/AddProject";
import UpdateProject from "../UpdateProject/UpdateProject";
import DeleteProject from "../DeleteProject/DeleteProject";
import { Icon } from "@iconify/react";
import {
	countries,
	categories,
	programmingLanguages,
	frameworkss,
} from "../AddProject/AddProject";
import "./project.css";
import axios from "axios";

interface Props {
	authToken: string | null;
}

export type ProjectType = {
	id: number;
	documentId: string;
	title: string;
	description: string;
	country: string;
	createdAt: string;
	updatedAt: string;
	memberSlots: number;
	categories: string;
	programmingLanguages: string;
	frameworks: string;
};

const Project = ({ authToken }: Props) => {
	const [projects, setProjects] = useState<ProjectType[]>([]);
	const fetchProjects = () => {
		axios
			.get("http://localhost:1337/api/projects", {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			})
			.then((res) => {
				const fetchedProjects = Array.isArray(res.data.data)
					? res.data.data
					: [];
				setProjects(fetchedProjects);
			})
			.catch(() => {
				console.log("No Projects found");
			});
	};

	useEffect(() => {
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
	}, [authToken]);

	const [projectToEdit, setProjectToEdit] = useState<ProjectType | null>(null);
	const [projectToDelete, setProjectToDelete] = useState<ProjectType | null>(
		null
	);
	return (
		<>
			<div className="project">
				{/* {authToken} */}
				<div className="header">
					<div className="title"> Your Projects</div>
					<button
						className="add-btn"
						type="submit"
						data-bs-toggle="modal"
						data-bs-target="#exampleModal1">
						Add Project
					</button>
					<AddProject authToken={authToken} onProjectAdded={fetchProjects} />
				</div>

				{projects.length === 0 ? (
					<div className="no-projects-message">
						<p>No projects found. Click "Add Project" to create one!</p>
					</div>
				) : (
					projects.map((project) => (
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
							<div className="ud-btn">
								<button
									type="submit"
									className="add-btn"
									data-bs-toggle="modal"
									data-bs-target="#exampleModal2"
									onClick={() => setProjectToEdit(project)}>
									Update
								</button>

								<button
									type="submit"
									className="add-btn"
									data-bs-toggle="modal"
									data-bs-target="#exampleModal3"
									onClick={() => setProjectToDelete(project)}>
									Delete
								</button>
							</div>
						</div>
					))
				)}

				<DeleteProject
					authToken={authToken}
					onProjectDeleted={fetchProjects}
					project={
						projectToDelete
							? {
									documentId: projectToDelete.documentId,
									title: projectToDelete.title,
									description: projectToDelete.description,
									memberSlots: projectToDelete.memberSlots,
									country:
										projectToDelete.country as (typeof countries)[number],
									categories:
										projectToDelete.categories as (typeof categories)[number],
									programmingLanguages:
										projectToDelete.programmingLanguages as (typeof programmingLanguages)[number],
									frameworks:
										projectToDelete.frameworks as (typeof frameworkss)[number],
							  }
							: null
					}
				/>

				<UpdateProject
					onProjectUpdated={fetchProjects}
					authToken={authToken}
					project={
						projectToEdit
							? {
									documentId: projectToEdit.documentId,
									title: projectToEdit.title,
									description: projectToEdit.description,
									memberSlots: projectToEdit.memberSlots,
									country: projectToEdit.country as (typeof countries)[number],
									categories:
										projectToEdit.categories as (typeof categories)[number],
									programmingLanguages:
										projectToEdit.programmingLanguages as (typeof programmingLanguages)[number],
									frameworks:
										projectToEdit.frameworks as (typeof frameworkss)[number],
							  }
							: null
					}
				/>
			</div>
		</>
	);
};

export default Project;
