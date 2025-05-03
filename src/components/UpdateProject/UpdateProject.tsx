import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { countries, tags, projectSchema } from "../AddProject/AddProject";

import "../AddProject/AddProject.css";

type UpdateFormData = z.infer<typeof projectSchema>;

type UpdateProjectProps = {
	project: UpdateFormData | null;
};

const UpdateProject = ({ project }: UpdateProjectProps) => {
	const {
		register: registerProject,
		handleSubmit: handleSubmitProject,
		formState: { errors: project_errors },
		control,
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
	};

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

					<form onSubmit={handleSubmitProject(onSubmitProject)}>
						<div className="add-form modal-body">
							<div className="top-section">
								<input
									{...registerProject("project_title")}
									type="text"
									placeholder="Project Title"
								/>
								{project_errors.project_title && (
									<p className="text-danger">
										{project_errors.project_title.message}
									</p>
								)}

								<textarea
									{...registerProject("project_description")}
									placeholder="Project Description"></textarea>
								{project_errors.project_description && (
									<p className="text-danger">
										{project_errors.project_description.message}
									</p>
								)}

								<div className="input-group">
									<select {...registerProject("country")}>
										<option value="">Select Country</option>
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

								<input
									type="date"
									{...registerProject("project_date")}
									placeholder="Project date"
								/>
								{project_errors.project_date && (
									<p className="text-danger">
										{project_errors.project_date.message}
									</p>
								)}

								<input
									type="number"
									{...registerProject("member_slots")}
									placeholder="Member slots"
								/>
								{project_errors.member_slots && (
									<p className="text-danger">
										{project_errors.member_slots.message}
									</p>
								)}
							</div>

							<div className="bottom-section">
								<Controller
									control={control}
									name="tags"
									render={({ field }) => (
										<>
											{tags.map((tag) => (
												<div className="form-check d-flex" key={tag}>
													<input
														className="form-check-input"
														type="checkbox"
														value={tag}
														id={`update-${tag}`}
														checked={field.value?.includes(tag) || false}
														onChange={(e) => {
															const checked = e.target.checked;
															const value = e.target.value;
															if (checked) {
																field.onChange([...(field.value || []), value]);
															} else {
																field.onChange(
																	(field.value || []).filter((t) => t !== value)
																);
															}
														}}
													/>
													<label
														className="form-check-label"
														htmlFor={`update-${tag}`}>
														{tag}
													</label>
												</div>
											))}
										</>
									)}
								/>
								{project_errors.tags && (
									<p className="text-danger">{project_errors.tags.message}</p>
								)}
							</div>
						</div>

						<div className="modal-footer">
							<button
								type="button"
								className="close-btn"
								data-bs-dismiss="modal">
								Close
							</button>
							<button type="submit" className="action-btn">
								Update
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default UpdateProject;
