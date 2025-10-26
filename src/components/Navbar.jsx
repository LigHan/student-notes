import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import notes from "../data/notes";
import { useModal } from "../context/ModalContext";

export default function Navbar() {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { openModal } = useModal();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const filteredNotes = useMemo(() => {
    if (!query.trim()) {
      return [];
    }
    const normalized = query.trim().toLowerCase();
    return notes.filter((note) =>
      note.title.toLowerCase().includes(normalized) || note.topic.toLowerCase().includes(normalized)
    );
  }, [query]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="pointer-events-none fixed left-1/2 top-5 z-40 w-full max-w-4xl -translate-x-1/2 px-4">
      <div className="pointer-events-auto glass-panel rounded-full border-white/40 bg-white/60 px-6 py-3 shadow-xl backdrop-blur-2xl">
        <div className="flex flex-col gap-3 sm:grid sm:grid-cols-[auto,1fr] sm:items-center sm:gap-3">
          <Link to="/" className="text-base font-semibold tracking-tight text-slate-900">
            Student Notes
          </Link>
          <div className="flex w-full items-center gap-3 text-xs font-medium text-slate-600 sm:text-sm">
            <div className="relative flex-1">
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 100)}
                placeholder="Найти конспект"
                className="w-full rounded-full border border-white/70 bg-white px-4 py-1.5 text-sm text-slate-700 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-300/70"
              />
              {isFocused && filteredNotes.length ? (
                <ul className="absolute left-0 right-0 top-11 z-10 max-h-60 overflow-auto rounded-2xl border border-slate-200 bg-white/95 shadow-lg backdrop-blur">
                  {filteredNotes.map((note) => (
                    <li key={note.id} className="border-b border-slate-100 last:border-none">
                      <button
                        type="button"
                        onMouseDown={() => {
                          navigate("/profile");
                          setQuery("");
                        }}
                        className="flex w-full flex-col items-start px-4 py-2 text-left text-sm text-slate-700 hover:bg-blue-50"
                      >
                        <span className="font-medium text-slate-900">{note.title}</span>
                        <span className="text-xs text-slate-500">{note.topic}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
              {isAuthenticated ? (
                <>
                  <span className="hidden text-slate-500 sm:inline">
                    {currentUser?.username ? `@${currentUser.username}` : "Аккаунт"}
                  </span>
                  <Link
                    to="/profile"
                    className="rounded-full border border-white/70 px-3 py-1 text-slate-700 transition hover:bg-slate-900 hover:text-white"
                  >
                    Профиль
                  </Link>
                  <button
                    type="button"
                    onClick={() => openModal("upload-note")}
                    className="rounded-full border border-white/70 px-3 py-1 text-slate-700 transition hover:bg-slate-900 hover:text-white"
                  >
                    Загрузить
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-full border border-white/70 px-3 py-1 text-slate-700 transition hover:bg-slate-900 hover:text-white"
                  >
                    Выйти
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="rounded-full border border-white/70 px-3 py-1 text-slate-700 transition hover:bg-slate-900 hover:text-white"
                  >
                    Войти
                  </Link>
                  <Link
                    to="/register"
                    className="rounded-full border border-white/70 px-3 py-1 text-slate-700 transition hover:bg-slate-900 hover:text-white"
                  >
                    Регистрация
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
