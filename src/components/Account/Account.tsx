import "./Account.css";

const Account = () => {
	return (
		<>
			<div className="account">
				<div className="title">My Account</div>
				<form className="login-form" action="">
					<input type="text" placeholder="Your email address" />
					<input type="text" placeholder="Your password" />
					<a href="#">Forgot password?</a>
					<button>Sign In</button>
					<a href="#">Don't have an account? Sign In</a>
				</form>
			</div>
		</>
	);
};

export default Account;
