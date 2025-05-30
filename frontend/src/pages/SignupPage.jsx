import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
	const { user, signup } = useAuth();
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	if (user) return <Navigate to="/" replace />;

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			await signup(name, email, password);
			// Optionally navigate here if signup does not redirect
		} catch (err) {
			const msg =
				err.response?.data?.message || "Signup failed. Please try again.";
			setError(msg);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-md mx-auto mt-16 p-8 border rounded-lg shadow-lg bg-white">
			<h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
				Sign Up
			</h2>

			{error && (
				<div
					className="mb-6 p-4 bg-red-100 text-red-700 border border-red-400 rounded"
					role="alert">
					{error}
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-5">
				<input
					type="text"
					placeholder="Name (optional)"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
				/>
				<input
					type="email"
					placeholder="Email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
				/>
				<input
					type="password"
					placeholder="Password"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
				/>
				<button
					type="submit"
					disabled={loading}
					className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50 font-semibold">
					{loading ? "Signing up..." : "Sign Up"}
				</button>
			</form>

			<p className="mt-6 text-center text-gray-700">
				Already have an account?{" "}
				<Link
					to="/login"
					className="text-blue-600 font-semibold hover:underline">
					Login here
				</Link>
			</p>

			<div
				onClick={() => navigate("/")}
				className="cursor-pointer mt-10 p-6 bg-yellow-200 border border-yellow-400 rounded-lg text-center text-xl font-semibold text-yellow-900 hover:bg-yellow-300 transition-colors select-none"
				role="button"
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						navigate("/");
					}
				}}
				aria-label="Go to home page to view blogs publicly">
				Or... go to the home page to view the blogs publicly
			</div>
		</div>
	);
};

export default SignupPage;
