import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";

const BlogListPage = () => {
	const { user } = useAuth();
	const [blogs, setBlogs] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [loading, setLoading] = useState(false);

	const fetchBlogs = async (page = 1) => {
		setLoading(true);
		try {
			const res = await api.get(`/blog/view?page=${page}&limit=6`);
			setBlogs(res.data.blogs);
			setCurrentPage(res.data.currentPage);
			setTotalPages(res.data.totalPages);
		} catch (error) {
			console.error(error);
			alert("Failed to fetch blogs.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchBlogs();
	}, []);

	const handlePageChange = (newPage) => {
		if (newPage < 1 || newPage > totalPages) return;
		fetchBlogs(newPage);
	};

	return (
		<div className="max-w-5xl mx-auto px-6 py-8">
			{/* Notice about blog creation */}
			<div className="mb-8 text-center">
				{!user ? (
					<p className="text-xl md:text-2xl font-semibold text-red-600 bg-red-100 inline-block px-6 py-4 rounded-lg shadow-sm select-none">
						You must be authenticated to create a blog
					</p>
				) : (
					<p className="text-xl md:text-2xl font-semibold text-green-700 bg-green-100 inline-block px-6 py-4 rounded-lg shadow-sm select-none">
						You can create a blog here:{" "}
						<Link
							to="/create"
							className="text-green-900 underline hover:text-green-700 transition"
							aria-label="Create a new blog post">
							Create Blog
						</Link>
					</p>
				)}
			</div>

			<h1 className="text-4xl font-extrabold mb-8 text-gray-900 tracking-wide">
				Latest Blogs
			</h1>

			{loading ? (
				<p className="text-center text-gray-600 text-lg">Loading blogs...</p>
			) : (
				<>
					{blogs.length === 0 ? (
						<p className="text-center text-gray-700 text-xl">No blogs found.</p>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{blogs.map((blog) => (
								<Link
									to={`/blogs/${blog._id}`}
									key={blog._id}
									className="block p-6 bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-transform duration-300"
									aria-label={`Read blog titled ${blog.title}`}>
									<h2 className="text-2xl font-semibold mb-3 text-gray-900">
										{blog.title}
									</h2>
									<p className="mb-4 text-gray-700 line-clamp-4">
										{blog.content}
									</p>
									<div className="flex items-center space-x-3">
										<div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
											{blog.author?.name
												? blog.author.name.charAt(0).toUpperCase()
												: (blog.author?.email || "U").charAt(0).toUpperCase()}
										</div>
										<p className="text-sm text-gray-600 font-medium">
											By: {blog.author?.name || blog.author?.email || "Unknown"}
										</p>
									</div>
								</Link>
							))}
						</div>
					)}

					{/* Pagination Controls */}
					{totalPages > 1 && (
						<div className="flex justify-center items-center space-x-4 mt-12">
							<button
								onClick={() => handlePageChange(currentPage - 1)}
								disabled={currentPage === 1}
								className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
								Previous
							</button>
							{[...Array(totalPages)].map((_, i) => {
								const page = i + 1;
								return (
									<button
										key={page}
										onClick={() => handlePageChange(page)}
										className={`px-4 py-2 rounded hover:bg-yellow-400 transition-colors ${
											page === currentPage
												? "bg-yellow-400 text-white font-bold"
												: "bg-gray-200"
										}`}>
										{page}
									</button>
								);
							})}
							<button
								onClick={() => handlePageChange(currentPage + 1)}
								disabled={currentPage === totalPages}
								className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
								Next
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default BlogListPage;
