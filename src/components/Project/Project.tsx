import { useState } from "react";
import AddProject from "../AddProject/AddProject";
import UpdateProject from "../UpdateProject/UpdateProject";
import DeleteProject from "../DeleteProject/DeleteProject";
import { Icon } from "@iconify/react";

import "./project.css";

const sampleProjectList = [
	{
		project_title: "Melbourne Parking App",
		project_description: "Solve parking issues in Melbourne.",
		country: "Australia" as const,
		project_date: "2025-05-01",
		member_slots: 4,
		tags: [
			"Information Technology",
			"React Native",
			"JavaScript",
			"TypeScript",
		],
	},
	{
		project_title: "Dating App",
		project_description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci reprehenderit assumenda iusto repudiandae numquam architecto!",
		country: "Australia" as const,
		project_date: "2025-09-10",
		member_slots: 4,
		tags: ["Information Technology", "TypeScript"],
	},
];

const Project = () => {
	type ProjectType = {
		project_title: string;
		project_description: string;
		country: "Australia" | "USA" | "UK" | "Canada";
		project_date: string;
		member_slots: number;
		tags: string[];
	};

	const [projectToEdit, setProjectToEdit] = useState<ProjectType | null>(null);

	return (
		<>
			<div className="project">
				<div className="header">
					<div className="title">Your Projects</div>
					<button
						className="add-btn"
						type="submit"
						data-bs-toggle="modal"
						data-bs-target="#exampleModal1">
						Add Project
					</button>
					<AddProject />
				</div>

				{sampleProjectList.map((sampleProject, index) => (
					<div className="project-description" key={index}>
						<div className="content">
							<div className="heading">{sampleProject.project_title}</div>
							<div className="properties">
								<li>
									<Icon icon="mdi:clock" width="16" height="16" />
									Posted {sampleProject.project_date}
								</li>
								<li>
									<Icon
										icon="material-symbols:space-dashboard"
										width="16"
										height="16"
									/>
									{sampleProject.member_slots} Slots Remaining
								</li>
								<li>
									<Icon icon="mdi:location" width="16" height="16" />
									{sampleProject.country}
								</li>
							</div>
							<div className="description">
								{sampleProject.project_description}
							</div>
							<div className="tags">
								{sampleProject.tags.map((tag, index) => (
									<li key={index}>{tag}</li>
								))}
							</div>
						</div>
						<div className="ud-btn">
							<button
								type="submit"
								className="add-btn"
								data-bs-toggle="modal"
								data-bs-target="#exampleModal2"
								onClick={() => setProjectToEdit(sampleProject)}>
								Update
							</button>
							<UpdateProject project={projectToEdit} />
							<button
								type="submit"
								className="add-btn"
								data-bs-toggle="modal"
								data-bs-target="#exampleModal3">
								Delete
							</button>
							<DeleteProject />
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default Project;
