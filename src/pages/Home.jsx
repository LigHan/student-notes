import { useMemo, useState } from "react";
import FeedCard from "../components/FeedCard";
import NoteCard from "../components/NoteCard";
import RequestCard from "../components/RequestCard";
import news from "../data/news";
import notes from "../data/notes";
import noteRequests from "../data/noteRequests";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";

export default function Home() {
  const [requests, setRequests] = useState(noteRequests);
  const { isAuthenticated, currentUser } = useAuth();
  const { openModal } = useModal();
  const latestNotes = useMemo(() => notes.slice(0, 3), []);

  const displayRequests = useMemo(() => {
    const preferred = currentUser?.preferredTags ?? [];
    if (preferred.length) {
      const filtered = requests.filter((request) =>
        (request.tags ?? []).some((tag) => preferred.includes(tag))
      );
      return filtered.length ? filtered : requests;
    }
    return requests;
  }, [requests, currentUser?.preferredTags]);

  const handleOpenUpload = () => {
    openModal("upload-note");
  };

  const handleOpenRequest = () => {
    openModal("request-note", {
      onCreate: (newRequest) => {
        setRequests((prev) => [newRequest, ...prev]);
        console.log("Создан запрос конспекта:", newRequest);
        alert("Запрос отправлен (мок). Авторы увидят его в своей ленте.");
      },
    });
  };

  const handleViewRequest = (request) => {
    openModal("request-details", { request });
  };

  return (
    <div className="space-y-12">
      <section>
        <div className="glass-section space-y-6 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Лента сообщества</h1>
              <p className="mt-2 text-sm text-slate-600">
                Следите за обновлениями платформы и обсуждениями пользователей.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleOpenUpload}
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Загрузить конспект
              </button>
              <button
                type="button"
                onClick={handleOpenRequest}
                className="rounded-full border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Запросить конспект
              </button>
            </div>
          </div>

          {!isAuthenticated && (
            <div className="glass-dashed border border-dashed border-white/50 px-4 py-3 text-sm text-slate-600">
              Войдите, чтобы загружать материалы и оставлять заявки на новые конспекты.
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-6">
              {news.map((item) => (
                <FeedCard key={item.id} item={item} />
              ))}
            </div>
            <aside className="space-y-6">
              <div className="glass-card p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900">Открытые запросы</h2>
                  {currentUser?.preferredTags?.length ? (
                    <span className="text-xs uppercase tracking-wide text-slate-500">
                      #{currentUser.preferredTags.join(" · ")}
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Посмотрите, какие темы сейчас ищут студенты, и поделитесь подходящими материалами.
                </p>
                <div className="mt-4 space-y-4">
                  {displayRequests.map((request) => (
                    <RequestCard
                      key={request.id}
                      request={request}
                      onSelect={() => handleViewRequest(request)}
                    />
                  ))}
                  {!displayRequests.length && (
                    <p className="glass-dashed px-4 py-4 text-sm text-slate-600">
                      По выбранным тегам пока нет заявок. Попробуйте расширить список интересов в профиле.
                    </p>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section>
        <div className="glass-section space-y-6 p-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Свежие конспекты</h2>
            <p className="mt-1 text-sm text-slate-600">Новые материалы от активных авторов.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {latestNotes.map((note) => (
              <NoteCard key={note.id} note={note} showActions />
            ))}
            {!latestNotes.length && (
              <p className="glass-dashed px-4 py-4 text-sm text-slate-600">
                Новых конспектов пока нет. Зайдите чуть позже или добавьте первый материал.
              </p>
            )}
          </div>
          {isAuthenticated && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleOpenUpload}
                className="rounded-full border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Поделиться конспектом
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
