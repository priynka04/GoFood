import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            })
        });

        const json = await response.json();

        if (!json.success) {
            alert("Enter valid credentials");
        } else {
            localStorage.setItem("authToken", json.authToken);
            navigate("/"); // Redirect to home on successful login
        }
    };

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    return (
        <div className="gh-panel gh-login-panel">
            <form onSubmit={handleSubmit} className="gh-form">
                <h2 className="gh-panel-title mb-4">Login to GoFood</h2>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label gh-label">Email address</label>
                    <input
                        type="email"
                        className="form-control gh-input"
                        name="email"
                        value={credentials.email}
                        onChange={onChange}
                        required
                        autoComplete="email"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label gh-label">Password</label>
                    <input
                        type="password"
                        className="form-control gh-input"
                        name="password"
                        value={credentials.password}
                        onChange={onChange}
                        required
                        autoComplete="current-password"
                        placeholder="Enter your password"
                    />
                </div>
                <button type="submit" className="gh-btn-primary w-100">Login</button>
            </form>
        </div>
    );
}