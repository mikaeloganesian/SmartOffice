const LoginPage = () => {
    return (
        <div className="flex items-center justify-center pt-20 pb-20">
            <div className="bg-white p-8 rounded-2xl shadow w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Вход</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="test@edu.hse.ru"
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
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-brown opacity-90 hover:opacity-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
                        >
                            Войти
                        </button>
                        <a
                            className="inline-block align-baseline font-bold text-sm text-brown opacity-90 hover:opacity-100"
                            href="#"
                        >
                            Забыли пароль?
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;