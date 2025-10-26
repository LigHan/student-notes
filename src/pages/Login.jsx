import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = login({ email });
    console.log("Авторизация (мок):", { email: user.email, remember });
    alert("Вы вошли в систему (мок). Теперь доступны загрузка и запросы конспектов.");
    setEmail("");
    setPassword("");
    setRemember(false);
    navigate("/profile");
  };

  return (
    <div className="glass-panel mx-auto max-w-md border border-white/45 p-8">
      <h1 className="text-2xl font-bold text-slate-900">Войти на платформу</h1>
      <p className="mt-2 text-sm text-slate-600">
        Используйте почту, указанную при регистрации. Авторизация выполнится после подключения бекенда.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label htmlFor="login-email" className="mb-1 block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded border border-white/50 bg-white/60 px-3 py-2 text-sm text-slate-900 backdrop-blur focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-400/60"
            placeholder="student@example.com"
          />
        </div>

        <div>
          <label htmlFor="login-password" className="mb-1 block text-sm font-medium text-slate-700">
            Пароль
          </label>
          <input
            id="login-password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded border border-white/50 bg-white/60 px-3 py-2 text-sm text-slate-900 backdrop-blur focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-400/60"
            placeholder="••••••••"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
            className="rounded border-white/60 bg-white/60 text-blue-600 focus:ring-blue-500"
          />
          Запомнить на этом устройстве
        </label>

        <button
          type="submit"
          className="w-full rounded bg-blue-600 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Войти
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-slate-500">
        Двухфакторная авторизация и восстановление пароля появятся после подключения сервера.
      </p>
    </div>
  );
}
