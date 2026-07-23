function Signup() {
    return (
        <div className="auth-container">
            <h2>Create Account</h2>
            <form className="auth-form">
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}
export default Signup;
