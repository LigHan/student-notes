import { formatDate } from "../utils/formatDate";

export default function RequestCard({ request, onSelect }) {
  if (!request) {
    return null;
  }

  const statusStyles = {
    open: "text-green-700 bg-green-500/15",
    "in-progress": "text-amber-700 bg-amber-500/15",
    fulfilled: "text-blue-700 bg-blue-500/15",
  };

  const baseClasses =
    "glass-card space-y-3 border border-dashed border-white/50 p-5 hover:shadow-2xl transition";

  const content = (
    <>
      <header className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{request.subject}</h3>
          <p className="text-sm text-slate-600">{request.topic}</p>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            statusStyles[request.status] ?? "text-slate-700 bg-slate-100"
          }`}
        >
          {request.status === "open" && "Открыт"}
          {request.status === "in-progress" && "В работе"}
          {request.status === "fulfilled" && "Выполнен"}
        </span>
      </header>

      <p className="text-sm leading-relaxed text-slate-700">{request.description}</p>

      {request.tags?.length ? (
        <div className="flex flex-wrap gap-2 text-xs text-slate-600">
          {request.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1">
              #{tag}
            </span>
          ))}
        </div>
      ) : null}

      <dl className="grid grid-cols-2 gap-3 text-xs text-slate-600 sm:text-sm">
        <div>
          <dt className="uppercase tracking-wide text-slate-400">Запросил(а)</dt>
          <dd>@{request.requester}</dd>
        </div>
        <div>
          <dt className="uppercase tracking-wide text-slate-400">Предпочт. формат</dt>
          <dd>{request.preferredFormat}</dd>
        </div>
        <div>
          <dt className="uppercase tracking-wide text-slate-400">Дедлайн</dt>
          <dd>{formatDate(request.deadline)}</dd>
        </div>
        <div>
          <dt className="uppercase tracking-wide text-slate-400">Откликов</dt>
          <dd>{request.responses}</dd>
        </div>
      </dl>
    </>
  );

  if (onSelect) {
    return (
      <button
        type="button"
        onClick={onSelect}
        className={`${baseClasses} w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      >
        {content}
      </button>
    );
  }

  return <article className={baseClasses}>{content}</article>;
}
