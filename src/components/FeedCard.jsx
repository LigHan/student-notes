import { useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { formatDateTime } from "../utils/formatDate";

export default function FeedCard({ item }) {
  if (!item) {
    return null;
  }

  const [comments, setComments] = useState(item.comments ?? []);

  const handleAddComment = (text) => {
    const newComment = {
      id: `${item.id}-comment-${comments.length + 1}`,
      author: "student123",
      text,
      createdAt: new Date().toISOString(),
    };

    setComments((prev) => [newComment, ...prev]);
    console.log("Новый комментарий к новости:", { newsId: item.id, ...newComment });
  };

  return (
    <article className="glass-card space-y-4 p-6 hover:shadow-2xl">
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
          <p className="mt-1 text-sm text-slate-600">{item.author}</p>
        </div>
        <time className="text-xs uppercase tracking-wide text-slate-400" dateTime={item.postedAt}>
          {formatDateTime(item.postedAt)}
        </time>
      </header>

      <p className="text-sm leading-relaxed text-slate-700">{item.text}</p>

      {item.tags?.length ? (
        <ul className="flex flex-wrap gap-2 text-xs">
          {item.tags.map((tag) => (
            <li key={tag} className="rounded-full bg-slate-500/10 px-2.5 py-1 text-slate-600">
              #{tag}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="border-t border-white/40 pt-4">
        <h4 className="text-sm font-semibold text-slate-800">Комментарии</h4>
        <div className="mt-3">
          <CommentForm onSubmit={handleAddComment} placeholder="Поделитесь своим мнением о новости..." />
        </div>
        <div className="mt-4">
          <CommentList comments={comments} emptyMessage="Пока нет комментариев — оставьте первый!" />
        </div>
      </div>
    </article>
  );
}
