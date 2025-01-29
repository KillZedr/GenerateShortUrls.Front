import { useState } from "react";

function LoginModal({ onClose, onLoginSuccess, onSwitchToRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        const newErrors = {};
    
        if (!email.includes("@")) {
            newErrors.email = "Invalid email address.";
        }
    
        if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }
    
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            setIsLoading(true);
    
            try {
                const response = await fetch("https://localhost:5001/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        UserEmail: email,  
                        Password: password,
                    }),
                });
    
                const responseText = await response.text(); // Сначала читаем как текст
    
                console.log("Server Response:", responseText); // Логируем ответ сервера
    
                if (response.ok) {
                    try {
                        const data = JSON.parse(responseText); // Пробуем распарсить как JSON
                        localStorage.setItem("authToken", data.token);
                    } catch {
                        console.warn("Server did not return JSON. Storing raw response.");
                        localStorage.setItem("authToken", responseText); // Если не JSON, сохраняем просто текст
                    }
                    onLoginSuccess();
                } else {
                    setErrors({ general: responseText || "An error occurred" });
                }
            } catch (error) {
                console.error(error);
                setErrors({ general: "Network error, please try again." });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Login</h2>

              
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

            
                {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}

              
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? "Logging in..." : "Confirm"}
                </button>

              
                <p className="text-center text-sm mt-3">
                    Don't have an account?{" "}
                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={onSwitchToRegister}
                    >
                        Register
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

export default LoginModal;