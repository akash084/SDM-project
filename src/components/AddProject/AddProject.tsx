import { useForm } from "react-hook-form";
import "./AddProject.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller } from "react-hook-form";

export const countries = ["Australia", "USA", "UK", "Canada"] as const;
export const tags = [
	"Information Technology",
	"Animation",
	"Engineering",
	"Art",
	"Film",
];

export const projectSchema = z.object({
	project_title: z.string().min(3, "Title must be at least 3 characters."),
	project_description: z
		.string()
		.min(6, "Description must be at least 3 characters."),
	country: z.enum(countries, {
		errorMap: () => ({ message: "Country is required." }),
	}),
	project_date: z
		.string()
		.min(1, "Project date is required.")
		.refine((val) => !isNaN(Date.parse(val)), {
			message: "Invalid date format.",
		}),
	member_slots: z.coerce.number().min(1, "At least one member is required."),
	tags: z.array(z.string()).min(1, "Select at least one tag."),
});

type ProjectFormData = z.infer<typeof projectSchema>;

const AddProject = () => {
	const {
		register: registerProject,
		handleSubmit: handleSubmitProject,
		formState: { errors: project_errors },
		control,
	} = useForm<ProjectFormData>({ resolver: zodResolver(projectSchema) });

	const onSubmitProject = (data: ProjectFormData) => {
		console.log("Project Data:", data);
	};
	return (
		<>
			<div
				className="modal fade"
				id="exampleModal1"
				tabIndex={-1}
				aria-labelledby="exampleModal1Label"
				aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModal_1Label">
								Add Project
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
										<select
											id="inputGroupSelect01"
											{...registerProject("country")}>
											<option></option>
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
										placeholder="Project date"></input>
									{project_errors.project_date && (
										<p className="text-danger">
											{project_errors.project_date.message}
										</p>
									)}
									<input
										type="number"
										{...registerProject("member_slots")}
										placeholder="Member slots"></input>
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
															id={tag}
															checked={field.value?.includes(tag) || false}
															onChange={(e) => {
																const checked = e.target.checked;
																const value = e.target.value;
																if (checked) {
																	field.onChange([
																		...(field.value || []),
																		value,
																	]);
																} else {
																	field.onChange(
																		(field.value || []).filter(
																			(t) => t !== value
																		)
																	);
																}
															}}
														/>
														<label className="form-check-label" htmlFor={tag}>
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
								<button type="submit" className="add-btn">
									Add Project
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddProject;
