import { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import noteRequests from "../data/noteRequests";

const FORM_DEFAULTS = {
  subject: "",
  topic: "",
  level: "",
  preferredFormat: "PDF",
  deadline: "",
  description: "",
};

const FORMATS = [
  { value: "PDF", label: "PDF" },
  { value: "JPG", label: "JPG" },
  { value: "PNG", label: "PNG" },
];

export default function RequestNoteForm({ onCreate }) {
  const [formData, setFormData] = useState(FORM_DEFAULTS);
  const [selectedTags, setSelectedTags] = useState([]);
  const [customTag, setCustomTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated, currentUser } = useAuth();

  const availableTags = useMemo(() => {
    const tagSet = new Set();
    noteRequests.forEach((request) => {
      (request.tags ?? []).forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort((a, b) => a.localeCompare(b, "ru"));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    );
  };

  const addCustomTag = () => {
    const tag = customTag.trim();
    if (!tag) {
      return;
    }
    setSelectedTags((prev) => (prev.includes(tag) ? prev : [...prev, tag]));
    setCustomTag("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isAuthenticated || !currentUser) {
      alert("Войдите в аккаунт, чтобы отправить запрос.");
      return;
    }

    setIsSubmitting(true);

    const normalizedTags = selectedTags.length ? selectedTags : [formData.subject];
    const newRequest = {
      id: `request-${Date.now()}`,
      subject: formData.subject,
      topic: formData.topic,
      level: formData.level,
      preferredFormat: formData.preferredFormat,
      deadline: formData.deadline,
      description: formData.description,
      requester: currentUser.username,
      status: "open",
      responses: 0,
      tags: normalizedTags,
    };

    onCreate?.(newRequest);
    setFormData(FORM_DEFAULTS);
    setSelectedTags([]);
    setCustomTag("");
    setIsSubmitting(false);
  };

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="text-center text-sm text-slate-600">
        <p>Авторизуйтесь, чтобы оставить заявку на конспект.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="request-subject" className="mb-1 block text-sm font-medium text-slate-700">
          Предмет
        </label>
        <input
          id="request-subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-300/70"
          placeholder="Например, История"
        />
      </div>

      <div>
        <label htmlFor="request-topic" className="mb-1 block text-sm font-medium text-slate-700">
          Тема
        </label>
        <input
          id="request-topic"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          required
          className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-300/70"
          placeholder="Например, Войны XVII века"
        />
      </div>

      <div>
        <label htmlFor="request-level" className="mb-1 block text-sm font-medium text-slate-700">
          Уровень / курс
        </label>
        <input
          id="request-level"
          name="level"
          value={formData.level}
          onChange={handleChange}
          required
          className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-300/70"
          placeholder="Например, 1 курс, 11 класс"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="request-preferredFormat"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Формат файла
          </label>
          <select
            id="request-preferredFormat"
            name="preferredFormat"
            value={formData.preferredFormat}
            onChange={handleChange}
            className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-300/70"
          >
            {FORMATS.map((format) => (
              <option key={format.value} value={format.value}>
                {format.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="request-deadline" className="mb-1 block text-sm font-medium text-slate-700">
            Крайний срок
          </label>
          <input
            id="request-deadline"
            name="deadline"
            type="date"
            value={formData.deadline}
            onChange={handleChange}
            required
            className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-300/70"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="request-description"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Что должно быть в конспекте?
        </label>
        <textarea
          id="request-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-300/70"
          placeholder="Укажите ключевые разделы, формат подачи, ссылки на материалы..."
        />
      </div>

      <div>
        <span className="mb-2 block text-sm font-medium text-slate-700">Теги запроса</span>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => {
            const isActive = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  isActive
                    ? "border border-blue-600 bg-blue-600/90 text-white shadow-sm"
                    : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                #{tag}
              </button>
            );
          })}
          {!availableTags.length && (
            <p className="text-xs text-slate-500">Пока нет предустановленных тегов — добавьте свои.</p>
          )}
        </div>
        <div className="mt-3 flex gap-2">
          <input
            type="text"
            value={customTag}
            onChange={(event) => setCustomTag(event.target.value)}
            placeholder="Добавить свой тег"
            className="flex-1 rounded border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-300/70"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addCustomTag();
              }
            }}
          />
          <button
            type="button"
            onClick={addCustomTag}
            className="rounded bg-blue-600 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-blue-700"
          >
            Добавить
          </button>
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Выберите несколько тегов или добавьте свои — по ним ваш запрос увидят подходящие авторы.
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
      >
        {isSubmitting ? "Отправляем..." : "Отправить запрос"}
      </button>
    </form>
  );
}
