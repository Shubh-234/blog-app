import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
	const { user, logout } = useAuth();

	return (
		<nav className="bg-blue-700 text-white p-5 flex justify-between items-center shadow-lg">
			<Link
				to="/"
				className="text-2xl font-extrabold tracking-wide hover:text-yellow-300 transition">
				📝 BlogSpace
			</Link>

			<div className="flex items-center space-x-8 text-lg">
				{user ? (
					<>
						<span className="mr-4 font-semibold">
							Hello,{" "}
							<span className="underline">{user.name || user.email}</span>
						</span>

						<Link
							to="/create"
							className="hover:text-yellow-300 transition font-medium"
							aria-label="Create a new blog post">
							Create Blog
						</Link>

						<button
							onClick={logout}
							className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition font-semibold"
							aria-label="Logout">
							Logout
						</button>
					</>
				) : (
					<>
						<Link
							to="/login"
							className="hover:text-yellow-300 transition font-medium">
							Login
						</Link>
						<Link
							to="/signup"
							className="hover:text-yellow-300 transition font-medium">
							Sign Up
						</Link>
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
