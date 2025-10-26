import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import GreetingsBackground from "./components/GreetingsBackground";
import Modal from "./components/Modal";
import UploadNoteForm from "./components/UploadNoteForm";
import RequestNoteForm from "./components/RequestNoteForm";
import RequestDetails from "./components/RequestDetails";
import { ModalProvider, useModal } from "./context/ModalContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function ModalRoot() {
  const { modal, closeModal, openModal } = useModal();

  if (!modal) {
    return null;
  }

  let title = "";
  let content = null;

  if (modal.type === "upload-note") {
    title = "Загрузить конспект";
    content = (
      <UploadNoteForm
        initialData={modal.props?.initialData}
        onSuccess={(payload) => {
          modal.props?.onSuccess?.(payload);
          closeModal();
        }}
      />
    );
  }

  if (modal.type === "request-note") {
    title = "Запросить конспект";
    content = (
      <RequestNoteForm
        onCreate={(payload) => {
          modal.props?.onCreate?.(payload);
          closeModal();
        }}
      />
    );
  }

  if (modal.type === "request-details") {
    title = "Подробности запроса";
    content = <RequestDetails request={modal.props?.request} />;
  }

  if (!content) {
    return null;
  }

  return (
    <Modal title={title} onClose={closeModal}>
      {content}
    </Modal>
  );
}

export default function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
        <GreetingsBackground />
        <Navbar />
        <main className="relative z-10 mx-auto max-w-6xl px-4 pb-12 pt-28 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <ModalRoot />
      </BrowserRouter>
    </ModalProvider>
  );
}
