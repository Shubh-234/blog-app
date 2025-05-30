import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const CreateBlogPage = () => {
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");
		setLoading(true);

		try {
			await api.post("/blog/create", { title, content });
			setSuccess("Blog created successfully!");
			setTimeout(() => navigate("/"), 1500);
		} catch (err) {
			setError(err.response?.data?.message || "Failed to create blog.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-2xl mx-auto mt-16 p-8 border rounded-lg shadow-lg bg-white">
			<h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
				Create New Blog
			</h2>

			{error && (
				<div
					className="mb-6 p-4 bg-red-100 text-red-700 border border-red-400 rounded"
					role="alert">
					{error}
				</div>
			)}

			{success && (
				<div
					className="mb-6 p-4 bg-green-100 text-green-700 border border-green-400 rounded"
					role="alert">
					{success}
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-6">
				<input
					type="text"
					placeholder="Title"
					required
					minLength={2}
					maxLength={100}
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="w-full p-4 border rounded-md focus:ring-2 focus:ring-green-500 outline-none text-lg"
				/>
				<textarea
					placeholder="Content"
					required
					minLength={10}
					maxLength={5000}
					rows={10}
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className="w-full p-4 border rounded-md focus:ring-2 focus:ring-green-500 outline-none text-lg resize-y"></textarea>
				<button
					type="submit"
					disabled={loading}
					className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition disabled:opacity-50 font-semibold">
					{loading ? "Creating..." : "Create Blog"}
				</button>
			</form>
		</div>
	);
};

export default CreateBlogPage;
