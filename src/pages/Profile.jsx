import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import RequestCard from "../components/RequestCard";
import notes from "../data/notes";
import noteRequests from "../data/noteRequests";
import { formatDate } from "../utils/formatDate";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";

export default function Profile() {
  const { currentUser, isAuthenticated, updateUser } = useAuth();
  const { openModal } = useModal();

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="glass-dashed mx-auto max-w-3xl space-y-4 p-8 text-center shadow-xl">
        <h1 className="text-2xl font-semibold text-slate-900">Требуется авторизация</h1>
        <p className="text-sm text-slate-600">
          Войдите в аккаунт, чтобы просматривать профиль, загруженные конспекты и историю запросов.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link to="/login" className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Войти
          </Link>
          <Link to="/register" className="rounded border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-600 hover:text-white">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    );
  }

  const myNotes = notes.filter((note) => note.owner === currentUser.username);
  const availableTags = useMemo(() => {
    const tagSet = new Set();
    noteRequests.forEach((request) => {
      (request.tags ?? []).forEach((tag) => tagSet.add(tag));
    });
    (currentUser.interests ?? []).forEach((tag) => tagSet.add(tag));
    (currentUser.preferredTags ?? []).forEach((tag) => tagSet.add(tag));
    return Array.from(tagSet).sort((a, b) => a.localeCompare(b, "ru"));
  }, [currentUser.interests, currentUser.preferredTags]);

  const [selectedTags, setSelectedTags] = useState(currentUser.preferredTags ?? []);

  useEffect(() => {
    setSelectedTags(currentUser.preferredTags ?? []);
  }, [currentUser.preferredTags]);

  const handleToggleTag = (tag) => {
    setSelectedTags((prev) => {
      const hasTag = prev.includes(tag);
      const next = hasTag ? prev.filter((item) => item !== tag) : [...prev, tag];
      updateUser({ preferredTags: next });
      return next;
    });
  };

  const recommendedRequests = useMemo(() => {
    const preferred = currentUser.preferredTags ?? [];
    const openRequests = noteRequests.filter((request) => request.status === "open");
    if (!preferred.length) {
      return openRequests;
    }
    return openRequests.filter((request) =>
      (request.tags ?? []).some((tag) => preferred.includes(tag))
    );
  }, [currentUser.preferredTags]);

  const handleOpenUploadModal = () => {
    openModal("upload-note");
  };

  const handleViewRequest = (request) => {
    openModal("request-details", { request });
  };

  return (
    <div className="space-y-10">
      <header className="glass-section p-6 lg:flex lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.username}
            className="h-16 w-16 rounded-full border border-white/60 object-cover shadow-md"
          />
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{currentUser.fullName}</h1>
            <p className="text-sm text-slate-600">@{currentUser.username}</p>
            <p className="mt-2 max-w-xl text-sm text-slate-700">{currentUser.bio}</p>
            <p className="mt-2 text-xs uppercase tracking-wide text-slate-400">
              С нами с {formatDate(currentUser.joinedAt)}
            </p>
          </div>
        </div>
        <div className="mt-6 flex gap-4 text-center text-sm text-slate-600 lg:mt-0">
          <div className="min-w-[100px] rounded-lg bg-blue-500/10 px-4 py-3 text-blue-800 backdrop-blur">
            <p className="text-xs uppercase text-blue-600">Конспектов</p>
            <p className="text-2xl font-semibold text-blue-700">{currentUser.stats.uploads}</p>
          </div>
        </div>
      </header>

      <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Мои конспекты</h2>
            <button
              type="button"
              onClick={handleOpenUploadModal}
              className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
            >
              + Добавить новый
            </button>
          </div>
          {myNotes.length ? (
            <div className="space-y-6">
              {myNotes.map((note) => (
                <NoteCard key={note.id} note={note} showComments showActions />
              ))}
            </div>
          ) : (
            <p className="glass-dashed rounded-2xl border border-dashed border-white/40 p-6 text-sm text-slate-600">
              У вас пока нет опубликованных конспектов. Загрузите первый файл в разделе «Загрузить».
            </p>
          )}
        </div>

        <aside className="space-y-6">
          <div className="glass-card p-5">
            <h3 className="text-lg font-semibold text-slate-900">Интересы</h3>
            <p className="mt-1 text-sm text-slate-600">
              На основе интересов мы подбираем запросы и рекомендуем конспекты сообщества.
            </p>
            <ul className="mt-3 flex flex-wrap gap-2 text-xs">
              {currentUser.interests.map((interest) => (
                <li key={interest} className="rounded-full bg-slate-500/10 px-2.5 py-1 text-slate-700/90">
                  {interest}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Предпочитаемые теги</h3>
              <span className="text-xs uppercase tracking-wide text-slate-500">
                {selectedTags.length} выбрано
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-600">
              Отметьте, какие темы вы чаще публикуете — по ним мы подберём актуальные запросы.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {availableTags.map((tag) => {
                const isActive = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleToggleTag(tag)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                      isActive
                        ? "border border-blue-600 bg-blue-600/90 text-white shadow-sm"
                        : "border border-white/60 bg-white/75 text-slate-700 backdrop-blur-sm hover:border-blue-400 hover:text-blue-600"
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
              {!availableTags.length && (
                <p className="text-xs text-slate-500">Пока нет тегов — добавьте новый запрос, чтобы начать.</p>
              )}
            </div>
          </div>

          <div className="glass-card p-5">
            <h3 className="text-lg font-semibold text-slate-900">Уведомления</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {currentUser.notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`rounded border px-3 py-2 backdrop-blur ${notification.read ? "border-white/30 bg-white/40 text-slate-600" : "border-blue-300/60 bg-blue-500/15 text-blue-800"}`}
                >
                  <p>{notification.text}</p>
                  <p className="mt-1 text-xs text-slate-400">Получено: {formatDate(notification.createdAt)}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card border border-emerald-200/50 bg-emerald-500/10 p-5 text-emerald-900 backdrop-blur">
            <h3 className="text-lg font-semibold">Запросы по вашим тегам</h3>
            <p className="mt-1 text-sm text-emerald-900/90">
              Подберите, на какие темы откликнуться — список обновляется по выбранным тегам.
            </p>
            <div className="mt-4 space-y-4">
              {recommendedRequests.length ? (
                recommendedRequests.map((request) => (
                  <RequestCard
                    key={request.id}
                    request={request}
                    onSelect={() => handleViewRequest(request)}
                  />
                ))
              ) : (
                <p className="glass-dashed border border-dashed border-emerald-200/60 px-3 py-4 text-sm text-emerald-800">
                  Пока нет запросов, подходящих под выбранные теги. Попробуйте расширить список интересов.
                </p>
              )}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
