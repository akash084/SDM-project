import { useForm } from "react-hook-form";
import { useRef } from "react";
import "./AddProject.css";
import { toast } from "react-toastify";
import { useEffect } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { Controller } from "react-hook-form";
import axios from "axios";
// import Project from "../Project/Project";

export const countries = [
	"USA",
	"Japan",
	"Australia",
	"England",
	"South Korea",
	"Nepal",
	"India",
] as const;
export const categories = [
	"Information Technology",
	"Art",
	"Engineering",
	"Movie / Video Editing",
	"VFX / 3D Modeling",
	"Animation",
] as const;

export const frameworkss = [
	"Django",
	"React",
	"Laravel",
	"ASP.Net",
	"Flutter",
] as const;

export const programmingLanguages = [
	"Python",
	"Javascript",
	"Typescript",
	"C",
	"C plus plus",
	"C sharp",
] as const;

export const projectSchema = z.object({
	title: z.string().min(3, "Title must be at least 3 characters."),
	description: z.string().min(6, "Description must be at least 6 characters."),
	country: z.enum(countries, {
		errorMap: () => ({ message: "Country is required." }),
	}),
	categories: z.enum(categories, {
		errorMap: () => ({ message: "categories is required." }),
	}),
	frameworks: z.enum(frameworkss, {
		errorMap: () => ({ message: "frameworks is required." }),
	}),
	programmingLanguages: z.enum(programmingLanguages, {
		errorMap: () => ({ message: "Programming Language is required." }),
	}),

	memberSlots: z.coerce.number().min(1, "At least one member is required."),

	id: z.number().optional(),
	documentId: z.string().optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface Props {
	authToken: string | null;
	onProjectAdded: () => void;
}

const AddProject = ({ authToken, onProjectAdded }: Props) => {
	const {
		register: registerProject,
		handleSubmit: handleSubmitProject,
		formState: { errors: project_errors },
		reset,
		// control,
	} = useForm<ProjectFormData>({ resolver: zodResolver(projectSchema) });

	const closeButtonRef = useRef<HTMLButtonElement>(null);

	const onSubmitProject = (data: ProjectFormData) => {
		console.log(data, authToken);
		axios
			.post("http://localhost:1337/api/project/create", data, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			})
			.then((res) => {
				console.log(res);
				onProjectAdded();
				toast.success("Project added successfully!");
				reset(); // reset form fields
				closeButtonRef.current?.click(); // close the modal
			})
			.catch((error) => {
				console.error(error);
				toast.error("Sorry, the project was not added");
			});
	};

	useEffect(() => {
		const modalElement = document.getElementById("exampleModal1");

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
							<h1 className="modal-title fs-5" id="exampleModal1Label">
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
											{...registerProject("country")}
											defaultValue="">
											<option value="" disabled hidden>
												Select a Country
											</option>
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
											{...registerProject("categories")}
											defaultValue="">
											<option value="" disabled hidden>
												Select a Category
											</option>
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
											{...registerProject("programmingLanguages")}
											defaultValue="">
											<option value="" disabled hidden>
												Select a Programming Language
											</option>
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
											{...registerProject("frameworks")}
											defaultValue="">
											<option value="" disabled hidden>
												Select a Framework
											</option>
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
