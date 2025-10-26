import { useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { formatDateTime } from "../utils/formatDate";

export default function NoteCard({ note, showComments = false, showActions = false }) {
  if (!note) {
    return null;
  }

  const [comments, setComments] = useState(note.comments ?? []);

  const handleAddComment = (text) => {
    const newComment = {
      id: `${note.id}-comment-${comments.length + 1}`,
      author: "student123",
      text,
      createdAt: new Date().toISOString(),
    };

    setComments((prev) => [newComment, ...prev]);
    console.log("Новый комментарий к конспекту:", { noteId: note.id, ...newComment });
  };

  return (
    <article className="glass-card p-5 hover:shadow-2xl">
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{note.title}</h3>
          <div className="mt-1 flex flex-wrap gap-2 text-sm text-slate-600">
            <span className="inline-flex items-center rounded-full bg-blue-500/15 px-2.5 py-0.5 text-xs font-medium text-blue-700/90">
              {note.subject}
            </span>
            <span className="inline-flex items-center rounded-full bg-slate-500/10 px-2.5 py-0.5 text-xs text-slate-700/90">
              {note.topic}
            </span>
          </div>
        </div>
        <div className="text-right text-xs text-slate-500">
          <p>Автор: @{note.owner}</p>
          <time dateTime={note.uploadedAt}>{formatDateTime(note.uploadedAt)}</time>
        </div>
      </header>

      <p className="mt-4 text-sm leading-relaxed text-slate-700">{note.preview}</p>

      <dl className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600">
        <div>
          <dt className="text-xs uppercase text-slate-400">Формат</dt>
          <dd>{note.fileType}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-slate-400">Размер</dt>
          <dd>{note.fileSize}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-slate-400">Загрузок</dt>
          <dd>{note.downloads}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-slate-400">Лайков</dt>
          <dd>{note.likes}</dd>
        </div>
      </dl>

      {showActions && (
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" className="rounded border border-blue-600 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-600 hover:text-white">
            Открыть
          </button>
          <button type="button" className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700">
            Скачать
          </button>
        </div>
      )}

      {showComments && (
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-slate-800">Комментарии</h4>
          <div className="mt-3 space-y-4">
            <CommentForm onSubmit={handleAddComment} placeholder="Оставьте отзыв или вопрос по конспекту..." />
            <CommentList comments={comments} emptyMessage="Комментариев пока нет. Будьте первым!" />
          </div>
        </div>
      )}
    </article>
  );
}
