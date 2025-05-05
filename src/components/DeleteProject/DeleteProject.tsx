import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import "../AddProject/AddProject.css";
import { projectSchema } from "../AddProject/AddProject";
import { z } from "zod";
import axios from "axios";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";

type DeleteFormData = z.infer<typeof projectSchema>;

interface Props {
	authToken: string | null;
	project: DeleteFormData | null;
	onProjectDeleted: () => void;
}

const DeleteProject = ({ authToken, project, onProjectDeleted }: Props) => {
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const { handleSubmit: handleSubmitProject, reset } = useForm<DeleteFormData>({
		resolver: zodResolver(projectSchema),
		defaultValues: project || {},
	});

	useEffect(() => {
		if (project) {
			reset(project);
		}
	}, [project, reset]);

	const onSubmitProject = (data: DeleteFormData) => {
		console.log(data.documentId);
		axios
			.delete(
				`http://localhost:1337/api/project/delete/${data.documentId}`,

				{
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				}
			)
			.then((res) => {
				console.log(res);
				onProjectDeleted();
				closeButtonRef.current?.click(); // close the modal
				toast.success("Project deleted successfully!");
				reset();
			})
			.catch((error) => {
				console.error(error);
				toast.error("Sorry, the project was not deleted");
			});
	};

	useEffect(() => {
		const modalElement = document.getElementById("exampleModal3");

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
				id="exampleModal3"
				tabIndex={-1}
				aria-labelledby="exampleModal3Label"
				aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						{project ? (
							<form onSubmit={handleSubmitProject(onSubmitProject)}>
								<div className="modal-header">
									<h1 className="modal-title fs-5" id="exampleModal3Label">
										Confirm Delete
									</h1>
									<button
										type="button"
										className="btn-close"
										data-bs-dismiss="modal"
										aria-label="Close"></button>
								</div>
								<div className="modal-body">
									Are you sure that you want to delete?
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
										Delete
									</button>
								</div>
							</form>
						) : (
							<div className="modal-body">No project selected for delete.</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default DeleteProject;
