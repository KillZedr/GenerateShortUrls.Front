import { useState } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setLoginModalOpen(false);
    };

    const handleRegisterSuccess = () => {
        setIsLoggedIn(true);
        setRegisterModalOpen(false);
    };

    return (
        <>
            <header className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center shadow-md">
                <h1 className="text-2xl font-bold">MyUrlFront</h1>

                <nav>
                    {!isLoggedIn ? (
                        <div className="flex gap-4">
                            <button
                                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
                                onClick={() => setLoginModalOpen(true)}
                            >
                                Login
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
                                onClick={() => setRegisterModalOpen(true)}
                            >
                                Register
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            <button className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg">
                                Account
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                                onClick={() => setIsLoggedIn(false)}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </nav>
            </header>

            {isLoginModalOpen && (
                <LoginModal
                    onClose={() => setLoginModalOpen(false)}
                    onSwitchToRegister={() => {
                        setLoginModalOpen(false);
                        setRegisterModalOpen(true);
                    }}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}

            {isRegisterModalOpen && (
                <RegisterModal
                    onClose={() => setRegisterModalOpen(false)}
                    onSwitchToLogin={() => {
                        setRegisterModalOpen(false);
                        setLoginModalOpen(true);
                    }}
                    onRegisterSuccess={handleRegisterSuccess}
                />
            )}
        </>
    );
}

export default Header;