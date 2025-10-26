import { formatDateTime } from "../utils/formatDate";

export default function CommentList({ comments = [], emptyMessage = "Пока нет комментариев." }) {
  if (!comments.length) {
    return <p className="text-sm text-slate-500">{emptyMessage}</p>;
  }

  return (
    <ul className="space-y-4">
      {comments.map((comment) => (
        <li key={comment.id} className="rounded-2xl border border-white/60 bg-white/55 p-4 shadow-lg backdrop-blur-md">
          <div className="flex items-center justify-between gap-4 border-b border-white/40 pb-2 text-xs uppercase tracking-wide text-slate-500">
            <span className="text-slate-700">@{comment.author}</span>
            <time dateTime={comment.createdAt}>{formatDateTime(comment.createdAt)}</time>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-800">{comment.text}</p>
        </li>
      ))}
    </ul>
  );
}
