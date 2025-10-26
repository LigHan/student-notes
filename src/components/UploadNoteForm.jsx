import { useEffect, useState } from "react";
import subjects from "../data/subjects";
import { useAuth } from "../context/AuthContext";

export default function UploadNoteForm({ onSuccess, initialData = {} }) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState(initialData.subject ?? "");
  const [topic, setTopic] = useState(initialData.topic ?? "");
  const [deadline, setDeadline] = useState(initialData.date ?? "");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const { isAuthenticated, currentUser } = useAuth();

  useEffect(() => {
    setSubject(initialData.subject ?? "");
    setTopic(initialData.topic ?? "");
    setDeadline(initialData.date ?? "");
  }, [initialData.subject, initialData.topic, initialData.date]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isAuthenticated || !currentUser) {
      alert("Войдите в аккаунт, чтобы загружать конспекты.");
      return;
    }

    if (!file) {
      alert("Добавьте файл конспекта (PDF, JPG или PNG).");
      return;
    }

    const payload = {
      title,
      subject,
      topic,
      date: deadline,
      preferredFormat: file?.type ?? "application/pdf",
      description,
      fileName: file.name,
      fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      owner: currentUser.username,
    };

    console.log("Отправка конспекта:", payload);
    alert(`Конспект «${title}» добавлен (мок). Проверьте раздел профиля.`);
    onSuccess?.(payload);

    setTitle("");
    setSubject("");
    setTopic("");
    setDeadline("");
    setDescription("");
    setFile(null);
    event.target.reset();
  };

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="text-center text-sm text-slate-600">
        <p>Авторизуйтесь, чтобы загрузить конспект.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label htmlFor="upload-title" className="mb-1 block text-sm font-medium text-slate-700">
            Название
          </label>
          <input
            id="upload-title"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            placeholder="Например, Лекции по линейной алгебре — матрицы"
            className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-300/70"
          />
        </div>
        <div>
          <label htmlFor="upload-subject" className="mb-1 block text-sm font-medium text-slate-700">
            Предмет
          </label>
          <select
            id="upload-subject"
            name="subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            required
            className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-300/70"
          >
            <option value="" disabled>
              Выберите предмет
            </option>
            {subjects.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="upload-topic" className="mb-1 block text-sm font-medium text-slate-700">
            Тема
          </label>
          <input
            id="upload-topic"
            name="topic"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            required
            placeholder="Матрицы и определители"
            className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-300/70"
          />
        </div>
      </div>

      <div>
        <label htmlFor="upload-deadline" className="mb-1 block text-sm font-medium text-slate-700">
          Дата создания / обновления
        </label>
        <input
          id="upload-deadline"
          name="deadline"
          type="date"
          value={deadline}
          onChange={(event) => setDeadline(event.target.value)}
          required
          className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-300/70"
        />
        <p className="mt-1 text-xs text-slate-500">Эта дата появится в карточке конспекта.</p>
      </div>

      <div>
        <label htmlFor="upload-description" className="mb-1 block text-sm font-medium text-slate-700">
          Краткое описание
        </label>
        <textarea
          id="upload-description"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
          rows={4}
          placeholder="Опишите, что внутри: темы, разделы, задачи, примеры."
          className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-300/70"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Файл конспекта</label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          required
          className="w-full rounded border border-dashed border-slate-200 bg-white px-3 py-3 text-sm file:mr-4 file:rounded file:border-0 file:bg-blue-600 file:px-3 file:py-2 file:font-medium file:text-white hover:file:bg-blue-700"
        />
        <p className="mt-1 text-xs text-slate-500">Максимальный размер — 25 MB. Для изображений допускается до 10 страниц.</p>
        {file && (
          <p className="mt-2 text-xs text-slate-600">
            Выбран файл: <span className="font-medium text-slate-800">{file.name}</span>
          </p>
        )}
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Добавить конспект
      </button>
    </form>
  );
}
