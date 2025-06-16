import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../components/ToastContext'; // adjust path as needed

export default function SignUp() {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        geolocation: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { showToast } = useToast(); // Use toast for notifications

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    location: credentials.geolocation
                })
            });

            const json = await response.json();
            if (json.success) {
                showToast("Account created successfully! Please log in.");
                navigate("/login");
            } else {
                showToast(json.message || "Enter valid credentials");
            }
        } catch (err) {
            showToast("Network or server error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    return (
        <div className="gh-panel gh-signup-panel">
            <form onSubmit={handleSubmit} className="gh-form">
                <h2 className="gh-panel-title mb-4">Sign Up for GoFood</h2>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label gh-label">Name</label>
                    <input
                        type="text"
                        className="form-control gh-input"
                        name="name"
                        value={credentials.name}
                        onChange={onChange}
                        required
                        placeholder="Enter your full name"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label gh-label">Email address</label>
                    <input
                        type="email"
                        className="form-control gh-input"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="email"
                        value={credentials.email}
                        onChange={onChange}
                        required
                        autoComplete="email"
                        placeholder="Enter your email"
                    />
                    <div id="emailHelp" className="form-text gh-form-hint">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label gh-label">Password</label>
                    <input
                        type="password"
                        className="form-control gh-input"
                        id="exampleInputPassword1"
                        name="password"
                        value={credentials.password}
                        onChange={onChange}
                        required
                        autoComplete="new-password"
                        placeholder="Create a password"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="geolocation" className="form-label gh-label">Address</label>
                    <input
                        type="text"
                        className="form-control gh-input"
                        id="geolocation"
                        name="geolocation"
                        value={credentials.geolocation}
                        onChange={onChange}
                        required
                        placeholder="Enter your address"
                    />
                </div>
                <button type="submit" className="gh-btn-success w-100" disabled={loading}>
                    {loading ? "Creating Account..." : "Submit"}
                </button>
                <Link to="/login" className="gh-btn-danger gh-alt-btn w-100 mt-2">Already a user?</Link>
            </form>
        </div>
    );
}