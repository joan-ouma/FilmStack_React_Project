import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            
            if (!res.ok) throw new Error(data.error || "Signup failed");
            
            navigate("/login");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>Create Account</h2>
            {error && <p className="error-msg">{error}</p>}
            <form className="auth-form" onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}
export default Signup;
