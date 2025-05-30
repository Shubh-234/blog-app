import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";

const BlogDetailPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { user } = useAuth();

	const [blog, setBlog] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [deleting, setDeleting] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);

	useEffect(() => {
		const fetchBlog = async () => {
			setLoading(true);
			setError("");
			try {
				const res = await api.get(`/blog/view/${id}`);
				setBlog(res.data.blog);
			} catch (err) {
				console.error(err);
				setError("Failed to fetch blog.");
				setTimeout(() => navigate("/"), 3000);
			} finally {
				setLoading(false);
			}
		};
		fetchBlog();
	}, [id, navigate]);

	const blogAuthorId =
		typeof blog?.author === "string" ? blog.author : blog?.author?._id;
	const isAuthor = user && user._id === blogAuthorId;
	const showAccessNotice = user && !isAuthor;

	const handleDelete = async () => {
		setError("");
		setSuccess("");

		if (!user) {
			setError("You must be logged in to delete blogs.");
			return;
		}

		if (!confirmDelete) {
			setConfirmDelete(true);
			return;
		}

		setDeleting(true);
		try {
			await api.delete(`/blog/delete/${id}`);
			setSuccess("Blog deleted successfully.");
			setTimeout(() => navigate("/"), 1500);
		} catch (err) {
			setError(
				err.response?.data?.message ||
					"You are not authorized to delete this blog."
			);
		} finally {
			setDeleting(false);
			setConfirmDelete(false);
		}
	};

	const handleEdit = () => {
		setError("");
		if (!user) {
			setError("You must be logged in to edit blogs.");
			return;
		}
		navigate(`/edit/${id}`);
	};

	if (loading)
		return <p className="p-4 text-center text-gray-600">Loading blog...</p>;
	if (!blog)
		return <p className="p-4 text-center text-gray-600">Blog not found.</p>;

	return (
		<div className="max-w-3xl mx-auto px-6 py-8 bg-white rounded-lg shadow-lg">
			{error && (
				<div
					className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded"
					role="alert">
					{error}
				</div>
			)}
			{success && (
				<div
					className="mb-4 p-3 bg-green-100 text-green-700 border border-green-400 rounded"
					role="alert">
					{success}
				</div>
			)}

			<h1 className="text-4xl font-bold mb-6 tracking-wide">{blog.title}</h1>
			<p className="mb-8 text-gray-800 whitespace-pre-wrap leading-relaxed">
				{blog.content}
			</p>

			<p className="mb-6 text-sm text-gray-600 font-medium">
				Author: {blog.author?.email || blog.author?.name || "Unknown"}
			</p>

			{showAccessNotice && (
				<div
					className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 font-semibold rounded"
					role="alert">
					⚠️ You are logged in but not the author of this blog. Edit and Delete
					options are disabled.
				</div>
			)}

			<div className="flex space-x-4">
				<button
					onClick={handleEdit}
					disabled={!isAuthor}
					className={`px-6 py-3 rounded font-semibold transition ${
						isAuthor
							? "bg-blue-600 text-white hover:bg-blue-700"
							: "bg-gray-400 text-white cursor-not-allowed"
					}`}
					aria-disabled={!isAuthor}>
					Edit
				</button>
				<button
					onClick={handleDelete}
					disabled={!isAuthor || deleting}
					className={`px-6 py-3 rounded font-semibold transition ${
						isAuthor && !deleting
							? "bg-red-600 text-white hover:bg-red-700"
							: "bg-gray-400 text-white cursor-not-allowed"
					}`}
					aria-disabled={!isAuthor || deleting}>
					{deleting
						? "Deleting..."
						: confirmDelete
						? "Confirm Delete"
						: "Delete"}
				</button>
			</div>
		</div>
	);
};

export default BlogDetailPage;
