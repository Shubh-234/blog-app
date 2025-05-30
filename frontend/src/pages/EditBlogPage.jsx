import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const EditBlogPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	useEffect(() => {
		const fetchBlog = async () => {
			try {
				const res = await api.get(`/blog/view/${id}`);
				setTitle(res.data.blog.title);
				setContent(res.data.blog.content);
			} catch (err) {
				setError("Failed to load blog for editing.");
				setTimeout(() => navigate("/"), 3000);
			} finally {
				setLoading(false);
			}
		};

		fetchBlog();
	}, [id, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");
		setSaving(true);

		try {
			await api.put(`/blog/update/${id}`, { title, content });
			setSuccess("Blog updated successfully!");
			setTimeout(() => navigate(`/blogs/${id}`), 1500);
		} catch (err) {
			setError(err.response?.data?.message || "Failed to update blog.");
		} finally {
			setSaving(false);
		}
	};

	if (loading)
		return <p className="p-4 text-center text-gray-600">Loading blog...</p>;

	return (
		<div className="max-w-2xl mx-auto mt-16 p-8 border rounded-lg shadow-lg bg-white">
			<h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
				Edit Blog
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
					className="w-full p-4 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-lg"
				/>
				<textarea
					placeholder="Content"
					required
					minLength={10}
					maxLength={5000}
					rows={10}
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className="w-full p-4 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-lg resize-y"></textarea>
				<button
					type="submit"
					disabled={saving}
					className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50 font-semibold">
					{saving ? "Saving..." : "Save Changes"}
				</button>
			</form>
		</div>
	);
};

export default EditBlogPage;
