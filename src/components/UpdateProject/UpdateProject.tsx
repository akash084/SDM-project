import { useRef } from "react";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	projectSchema,
	countries,
	categories,
	programmingLanguages,
	frameworkss,
} from "../AddProject/AddProject";

import "../AddProject/AddProject.css";

type UpdateFormData = z.infer<typeof projectSchema>;

type UpdateProjectProps = {
	project: UpdateFormData | null;
	authToken: string | null;
	onProjectUpdated: () => void;
};

const UpdateProject = ({
	project,
	authToken,
	onProjectUpdated,
}: UpdateProjectProps) => {
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	const {
		register: registerProject,
		handleSubmit: handleSubmitProject,
		formState: { errors: project_errors },
		reset,
	} = useForm<UpdateFormData>({
		resolver: zodResolver(projectSchema),
		defaultValues: project || {},
	});

	useEffect(() => {
		if (project) {
			reset(project);
		}
	}, [project, reset]);

	const onSubmitProject = (data: UpdateFormData) => {
		console.log("Updated Project Data:", data);

		axios
			.put(
				`http://localhost:1337/api/project/update/${data.documentId}`,
				data,
				{
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				}
			)
			.then((res) => {
				console.log(res);
				onProjectUpdated();
				closeButtonRef.current?.click(); // close the modal
				toast.success("Project updated successfully!");
				reset();
			})
			.catch((error) => {
				console.error(error);
				toast.error("Sorry, the project was not updated");
			});
	};

	useEffect(() => {
		const modalElement = document.getElementById("exampleModal2");

		if (!modalElement) return;

		const handleModalHidden = () => {
			reset(); // reset form on close
		};

		modalElement.addEventListener("hidden.bs.modal", handleModalHidden);

		// Cleanup
		return () => {
			modalElement.removeEventListener("hidden.bs.modal", handleModalHidden);
		};
	}, [reset]);

	return (
		<div
			className="modal fade"
			id="exampleModal2"
			tabIndex={-1}
			aria-labelledby="exampleModal2Label"
			aria-hidden="true">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="exampleModal2Label">
							Update Project
						</h1>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"></button>
					</div>
					{project ? (
						<form onSubmit={handleSubmitProject(onSubmitProject)}>
							<div className="add-form modal-body">
								<div className="top-section">
									<input
										{...registerProject("title")}
										type="text"
										placeholder="Project Title"
									/>
									{project_errors.title && (
										<p className="text-danger">
											{project_errors.title.message}
										</p>
									)}

									<textarea
										{...registerProject("description")}
										placeholder="Project Description"></textarea>
									{project_errors.description && (
										<p className="text-danger">
											{project_errors.description.message}
										</p>
									)}

									<input
										type="number"
										{...registerProject("memberSlots")}
										placeholder="Member slots"></input>
									{project_errors.memberSlots && (
										<p className="text-danger">
											{project_errors.memberSlots.message}
										</p>
									)}

									<div className="input-group">
										<select
											id="inputGroupSelect01"
											{...registerProject("country")}>
											{countries.map((country) => (
												<option key={country} value={country}>
													{country}
												</option>
											))}
										</select>
									</div>
									{project_errors.country && (
										<p className="text-danger">
											{project_errors.country.message}
										</p>
									)}
									<div className="input-group">
										<select
											id="inputGroupSelect01"
											{...registerProject("categories")}>
											{categories.map((categories) => (
												<option key={categories} value={categories}>
													{categories}
												</option>
											))}
										</select>
									</div>
									{project_errors.categories && (
										<p className="text-danger">
											{project_errors.categories.message}
										</p>
									)}
									<div className="input-group">
										<select
											id="inputGroupSelect01"
											{...registerProject("programmingLanguages")}>
											{programmingLanguages.map((programmingLanguages) => (
												<option
													key={programmingLanguages}
													value={programmingLanguages}>
													{programmingLanguages}
												</option>
											))}
										</select>
									</div>
									{project_errors.programmingLanguages && (
										<p className="text-danger">
											{project_errors.programmingLanguages.message}
										</p>
									)}
									<div className="input-group">
										<select
											id="inputGroupSelect01"
											{...registerProject("frameworks")}>
											{frameworkss.map((frameworks) => (
												<option key={frameworks} value={frameworks}>
													{frameworks}
												</option>
											))}
										</select>
									</div>
									{project_errors.frameworks && (
										<p className="text-danger">
											{project_errors.frameworks.message}
										</p>
									)}
								</div>
							</div>

							<div className="modal-footer">
								<button
									type="button"
									className="close-btn"
									data-bs-dismiss="modal"
									ref={closeButtonRef}>
									Close
								</button>
								<button type="submit" className="action-btn">
									Update
								</button>
							</div>
						</form>
					) : (
						<div className="modal-body">No project selected for update.</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default UpdateProject;
