import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./Account.css";

// Login schema
const loginSchema = z.object({
	login_email: z.string().min(3, "Email must be at least 3 characters."),
	login_password: z.string().min(6, "Password must be at least 6 characters."),
});

// Register schema with password confirmation
const registerSchema = z
	.object({
		register_email: z.string().min(3, "Email must be at least 3 characters."),
		register_password: z
			.string()
			.min(6, "Password must be at least 6 characters."),
		register_confirm_password: z
			.string()
			.min(6, "Confirm Password must be at least 6 characters."),
	})
	.refine((data) => data.register_password === data.register_confirm_password, {
		message: "Passwords do not match",
		path: ["register_confirm_password"],
	});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

const Account = () => {
	const [registered, setRegistered] = useState(true);

	const {
		register: registerLogin,
		handleSubmit: handleSubmitLogin,
		formState: { errors: login_errors },
	} = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

	const {
		register: registerRegister,
		handleSubmit: handleSubmitRegister,
		formState: { errors: register_errors },
	} = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

	const onSubmitLogin = (data: LoginFormData) => {
		console.log("Login Data:", data);
	};

	const onSubmitRegister = (data: RegisterFormData) => {
		console.log("Register Data:", data);
	};

	return (
		<div className="account">
			<div className="title">My Account</div>

			{registered ? (
				<form
					onSubmit={handleSubmitLogin(onSubmitLogin)}
					className="login-form">
					<input
						{...registerLogin("login_email")}
						type="text"
						placeholder="Your email address"
					/>

					{login_errors.login_email && (
						<p className="text-danger">{login_errors.login_email.message}</p>
					)}

					<input
						{...registerLogin("login_password")}
						type="password"
						placeholder="Your password"
					/>

					{login_errors.login_password && (
						<p className="text-danger">{login_errors.login_password.message}</p>
					)}

					<a href="#">Forgot password?</a>
					<button type="submit">Sign In</button>

					<a
						href="#"
						onClick={(e) => {
							e.preventDefault();
							setRegistered(false);
						}}>
						Don't have an account? Sign Up
					</a>
				</form>
			) : (
				<form
					onSubmit={handleSubmitRegister(onSubmitRegister)}
					className="register-form">
					<input
						{...registerRegister("register_email")}
						type="text"
						placeholder="Your email address"
					/>

					{register_errors.register_email && (
						<p className="text-danger">
							{register_errors.register_email.message}
						</p>
					)}

					<input
						{...registerRegister("register_password")}
						type="password"
						placeholder="Your password"
					/>

					{register_errors.register_password && (
						<p className="text-danger">
							{register_errors.register_password.message}
						</p>
					)}

					<input
						{...registerRegister("register_confirm_password")}
						type="password"
						placeholder="Confirm password"
					/>

					{register_errors.register_confirm_password && (
						<p className="text-danger">
							{register_errors.register_confirm_password.message}
						</p>
					)}

					<button type="submit">Sign Up</button>
					<a
						href="#"
						onClick={(e) => {
							e.preventDefault();
							setRegistered(true);
						}}>
						Already have an account? Sign In
					</a>
				</form>
			)}
		</div>
	);
};

export default Account;
