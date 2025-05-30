import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			axios
				.get("/auth/me")
				.then((res) => {
					setUser(res.data.user);
					console.log("auth me is working fine", res.data.user);
				})
				.catch(() => localStorage.removeItem("token"))
				.finally(() => setLoading(false));
		} else {
			setLoading(false);
		}
	}, []);

	const login = async (email, password) => {
		const res = await axios.post("/auth/login", { email, password });
		localStorage.setItem("token", res.data.token);
		setUser(res.data.user);
		navigate("/");
	};

	const signup = async (name, email, password) => {
		const res = await axios.post("/auth/signup", { name, email, password });
		localStorage.setItem("token", res.data.token);
		setUser(res.data.user);
		navigate("/");
	};


	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
		navigate("/login");
	};

	return (
		<AuthContext.Provider value={{ user, login, signup, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
