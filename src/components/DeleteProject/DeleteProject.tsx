import "../AddProject/AddProject.css";

const DeleteProject = () => {
	return (
		<>
			<div
				className="modal fade"
				id="exampleModal3"
				tabIndex={-1}
				aria-labelledby="exampleModalLabel3"
				aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel3">
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
								data-bs-dismiss="modal">
								Close
							</button>
							<button type="button" className="action-btn">
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DeleteProject;
