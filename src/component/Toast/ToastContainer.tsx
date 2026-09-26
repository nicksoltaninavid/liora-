import { AnimatePresence, motion } from "framer-motion";
import { IoCheckmarkCircle, IoClose } from "react-icons/io5";
import { useToasts } from "../store/toast";

function ToastContainer() {
  const toasts = useToasts((s) => s.toasts);
  const dismiss = useToasts((s) => s.dismiss);

  return (
    <div className="fixed bottom-5 left-1/2 z-80 flex -translate-x-1/2 flex-col items-center gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-3 rounded-full bg-dark px-5 py-3 text-sm font-bold text-primary shadow-xl"
          >
            <IoCheckmarkCircle className="text-accent" aria-hidden="true" />
            <span>{t.message}</span>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              aria-label="بستن پیام"
              className="cursor-pointer text-primary/60 transition hover:text-primary"
            >
              <IoClose aria-hidden="true" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default ToastContainer;