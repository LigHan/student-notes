import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const STUDY_AREAS = [
  "Естественные науки",
  "Инженерия",
  "Гуманитарные науки",
  "Экономика",
  "Иностранные языки",
];

export default function Register() {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    studyArea: STUDY_AREAS[0],
    agree: false,
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formState.password !== formState.confirmPassword) {
      alert("Пароли не совпадают.");
      return;
    }

    if (!formState.agree) {
      alert("Подтвердите согласие с условиями.");
      return;
    }

    const payload = {
      username: formState.username,
      email: formState.email,
      studyArea: formState.studyArea,
    };

    console.log("Регистрация пользователя:", payload);
    alert("Регистрация завершена (мок). Мы автоматически авторизовали вас.");

    login({
      username: formState.username || undefined,
      email: formState.email,
      fullName: formState.username || "Новый студент",
      interests: [formState.studyArea],
    });

    setFormState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      studyArea: STUDY_AREAS[0],
      agree: false,
    });
    navigate("/profile");
  };

  return (
    <div className="glass-panel mx-auto max-w-2xl border border-white/45 p-8">
      <h1 className="text-3xl font-bold text-slate-900">Создать аккаунт</h1>
      <p className="mt-2 text-sm text-slate-600">
        Зарегистрируйтесь, чтобы сохранять свои конспекты, оставлять комментарии и помогать другим студентам.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="username" className="mb-1 block text-sm font-medium text-slate-700">
              Имя пользователя
            </label>
            <input
              id="username"
              name="username"
              required
              value={formState.username}
              onChange={handleChange}
              placeholder="student123"
              className="w-full rounded border border-white/50 bg-white/60 px-3 py-2 text-sm text-slate-900 backdrop-blur focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-400/60"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formState.email}
              onChange={handleChange}
              placeholder="student@example.com"
              className="w-full rounded border border-white/50 bg-white/60 px-3 py-2 text-sm text-slate-900 backdrop-blur focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-400/60"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
              Пароль
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formState.password}
              onChange={handleChange}
              placeholder="Минимум 8 символов"
              className="w-full rounded border border-white/50 bg-white/60 px-3 py-2 text-sm text-slate-900 backdrop-blur focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-400/60"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-slate-700">
              Повторите пароль
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formState.confirmPassword}
              onChange={handleChange}
              className="w-full rounded border border-white/50 bg-white/60 px-3 py-2 text-sm text-slate-900 backdrop-blur focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-400/60"
            />
          </div>
        </div>

        <div>
          <label htmlFor="studyArea" className="mb-1 block text-sm font-medium text-slate-700">
            Направление обучения
          </label>
          <select
            id="studyArea"
            name="studyArea"
            value={formState.studyArea}
            onChange={handleChange}
            className="w-full rounded border border-white/50 bg-white/60 px-3 py-2 text-sm text-slate-900 backdrop-blur focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-400/60"
          >
            {STUDY_AREAS.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-slate-500">Рекомендует подходящие конспекты и запросы.</p>
        </div>

        <label className="flex items-start gap-3 rounded border border-white/50 bg-white/50 px-4 py-3 text-sm text-slate-600 backdrop-blur">
          <input
            type="checkbox"
            name="agree"
            checked={formState.agree}
            onChange={handleChange}
            className="mt-1 rounded border-white/60 bg-white/60 text-blue-600 focus:ring-blue-500"
          />
          <span>
            Я согласен с правилами платформы и политикой обработки данных. После регистрации на почту придёт письмо
            для подтверждения.
          </span>
        </label>

        <button
          type="submit"
          className="w-full rounded bg-blue-600 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Создать аккаунт
        </button>
      </form>
    </div>
  );
}
