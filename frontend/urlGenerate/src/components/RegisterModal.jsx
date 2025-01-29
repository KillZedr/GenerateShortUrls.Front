import { useState } from "react";

function RegisterModal({ onClose, onRegisterSuccess, onSwitchToLogin }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        const newErrors = {};
    
        if (!name.trim()) {
            newErrors.name = "Name is required.";
        }
    
        if (!email.includes("@")) {
            newErrors.email = "Invalid email address.";
        }
    
        if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }
    
        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }
    
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
    
        setErrors({});
        setIsLoading(true);
    
        const requestBody = {
            UserName: name.trim(),
            Email: email.trim(),
            Password: password.trim(),
        };
    
        console.log("Sending request with body:", requestBody);
    
        try {
            const response = await fetch("https://localhost:5001/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });
    
            const data = await response.json();
    
            console.log("Response:", response.status, data);
    
            if (response.ok) {
                localStorage.setItem("authToken", data.token); 
                onRegisterSuccess();
            } else {
                setErrors({ general: data.message || "Registration failed" });
            }
        } catch (error) {
            console.error("Error sending request:", error);
            setErrors({ general: "An error occurred, please try again." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Register</h2>

                {errors.general && (
                    <p className="text-red-500 text-sm mb-3">{errors.general}</p>
                )}

                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Name"
                        className={`w-full p-2 border rounded ${
                            errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div className="mb-3">
                    <input
                        type="email"
                        placeholder="Email"
                        className={`w-full p-2 border rounded ${
                            errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="mb-3">
                    <input
                        type="password"
                        placeholder="Password"
                        className={`w-full p-2 border rounded ${
                            errors.password ? "border-red-500" : "border-gray-300"
                        }`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password}</p>
                    )}
                </div>

                <div className="mb-3">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className={`w-full p-2 border rounded ${
                            errors.confirmPassword ? "border-red-500" : "border-gray-300"
                        }`}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                    )}
                </div>

                <button
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? "Registering..." : "Register"}
                </button>

                <p className="text-center text-sm mt-3">
                    Already have an account?{" "}
                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={onSwitchToLogin}
                    >
                        Login
                    </span>
                </p>

                <button
                    className="text-gray-500 mt-3 block mx-auto"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default RegisterModal;