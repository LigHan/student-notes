import { formatDate } from "../utils/formatDate";
import { useModal } from "../context/ModalContext";

export default function RequestDetails({ request }) {
  const { closeModal, openModal } = useModal();

  if (!request) {
    return null;
  }

  const handleUpload = () => {
    closeModal();
    openModal("upload-note", {
      initialData: {
        subject: request.subject,
        topic: request.topic,
      },
    });
  };

  return (
    <div className="space-y-5 text-slate-800">
      <div className="rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-lg">
        <h3 className="text-xl font-semibold text-slate-900">{request.subject}</h3>
        <p className="mt-1 text-sm text-slate-600">{request.topic}</p>
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase text-slate-600/70">Уровень</p>
            <p className="font-medium text-slate-900">{request.level}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-slate-600/70">Крайний срок</p>
            <p className="font-medium text-slate-900">{formatDate(request.deadline)}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-slate-600/70">Формат</p>
            <p className="font-medium text-slate-900">{request.preferredFormat}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-slate-600/70">Запросил(а)</p>
            <p className="font-medium text-slate-900">@{request.requester}</p>
          </div>
        </div>
        <p className="mt-4 rounded-xl bg-white/80 px-4 py-3 text-sm leading-relaxed text-slate-900 shadow-inner">
          {request.description}
        </p>
        {request.tags?.length ? (
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {request.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-slate-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <button
        type="button"
        onClick={handleUpload}
        className="w-full rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Загрузить конспект
      </button>
    </div>
  );
}
