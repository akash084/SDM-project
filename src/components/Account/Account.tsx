import { toast } from "react-toastify";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./Account.css";

interface Props {
	onTokenReceived: (token: string) => void;
	onLoggedIn: (loginStatus: boolean) => void;
}

// Login schema
const loginSchema = z.object({
	email: z.string().min(3, "Email must be at least 3 characters."),
	password: z.string().min(6, "Password must be at least 6 characters."),
});

// Register schema with password confirmation
const registerSchema = z
	.object({
		email: z.string().min(3, "Email must be at least 3 characters."),
		password: z.string().min(6, "Password must be at least 6 characters."),
		confirm_password: z
			.string()
			.min(6, "Confirm Password must be at least 6 characters."),
	})
	.refine((data) => data.password === data.confirm_password, {
		message: "Passwords do not match",
		path: ["confirm_password"],
	});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

const Account = ({ onTokenReceived, onLoggedIn }: Props) => {
	const [registered, setRegistered] = useState(true);

	const {
		register: registerLogin,
		handleSubmit: handleSubmitLogin,
		formState: { errors: login_errors },
		reset: resetLogin,
	} = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

	const {
		register: registerRegister,
		handleSubmit: handleSubmitRegister,
		formState: { errors: register_errors },
		reset: resetRegister,
	} = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

	const onSubmitLogin = (data: LoginFormData) => {
		axios
			.post("http://localhost:1337/api/native/login", data)
			.then((res) => {
				const token = res.data.data;
				// console.log(token);
				resetLogin();
				toast.success("Logged in successfully!");
				onTokenReceived(token); // <-- renamed here
				onLoggedIn(true);
			})
			.catch(() => {
				toast.error("Email or password is incorrect.");
			});
	};

	const onSubmitRegister = (data: RegisterFormData) => {
		console.log("Register Data:", data);
		axios
			.post("http://localhost:1337/api/native/register", {
				email: data.email,
				password: data.password,
			})
			.then((res) => {
				console.log(res);
				resetRegister();
				toast.success("Registered in succesfully!");
			})
			.catch(() => {
				toast.error("Email already used is another account.");
			});
	};

	return (
		<div className="account">
			<div className="title">My Account</div>

			{registered ? (
				<form
					onSubmit={handleSubmitLogin(onSubmitLogin)}
					className="login-form">
					<input
						{...registerLogin("email")}
						type="text"
						placeholder="Your email address"
					/>

					{login_errors.email && (
						<p className="text-danger">{login_errors.email.message}</p>
					)}

					<input
						{...registerLogin("password")}
						type="password"
						placeholder="Your password"
					/>

					{login_errors.password && (
						<p className="text-danger">{login_errors.password.message}</p>
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
						{...registerRegister("email")}
						type="text"
						placeholder="Your email address"
					/>

					{register_errors.email && (
						<p className="text-danger">{register_errors.email.message}</p>
					)}

					<input
						{...registerRegister("password")}
						type="password"
						placeholder="Your password"
					/>

					{register_errors.password && (
						<p className="text-danger">{register_errors.password.message}</p>
					)}

					<input
						{...registerRegister("confirm_password")}
						type="password"
						placeholder="Confirm password"
					/>

					{register_errors.confirm_password && (
						<p className="text-danger">
							{register_errors.confirm_password.message}
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
