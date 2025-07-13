import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate("/");
    };

    return (
        <div className="flex items-center justify-center pt-20 pb-20">
            <div className="bg-white p-8 rounded-2xl shadow w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Вход</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="test@edu.hse.ru"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Пароль
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-brown opacity-90 hover:opacity-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 w-full"
                        >
                            Войти
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;