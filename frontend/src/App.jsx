import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import BlogListPage from "./pages/BlogListPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import CreateBlogPage from "./pages/CreateBlogPage";
import EditBlogPage from "./pages/EditBlogPage";
import NotFoundPage from "./pages/NotFoundPage"; // Create this page for 404
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
   const token = localStorage.getItem("token");
   console.log(token)
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<BlogListPage />} />

				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignupPage />} />

				<Route path="/blogs/:id" element={<BlogDetailPage />} />

				<Route
					path="/create"
					element={
						<PrivateRoute>
							<CreateBlogPage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/edit/:id"
					element={
						<PrivateRoute>
							<EditBlogPage />
						</PrivateRoute>
					}
				/>

				{/* Catch-all 404 route */}
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</>
	);
};

export default App;
