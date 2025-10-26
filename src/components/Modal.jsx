import { useEffect } from "react";
import { createPortal } from "react-dom";

const modalRoot = typeof document !== "undefined" ? document.body : null;

export default function Modal({ title, children, onClose, widthClass = "max-w-3xl" }) {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 backdrop-blur-sm">
      <div
        className="absolute inset-0"
        role="presentation"
        onClick={onClose}
      />
      <div className={`relative z-10 w-full ${widthClass} px-4 transition-transform duration-300 ease-out animate-modal-scale`}>
        <div className="glass-panel border border-white/60 p-6 shadow-2xl">
          <div className="flex items-start justify-between gap-4">
            {title ? <h2 className="text-xl font-semibold text-slate-900">{title}</h2> : <div />}
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-slate-300 bg-white/80 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:bg-white"
            >
              Закрыть
            </button>
          </div>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
