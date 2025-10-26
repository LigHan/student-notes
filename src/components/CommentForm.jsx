import { useState } from "react";

export default function CommentForm({ onSubmit, placeholder = "Оставьте комментарий..." }) {
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = value.trim();

    if (!trimmed) {
      return;
    }

    setIsSubmitting(true);
    onSubmit?.(trimmed);
    setValue("");
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full rounded border border-white/50 bg-white/60 px-3 py-2 text-sm text-slate-900 backdrop-blur focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-400/60"
      />
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Авторизация будет добавлена позже — комментарии сохраняются локально.</span>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-75"
        >
          Отправить
        </button>
      </div>
    </form>
  );
}
