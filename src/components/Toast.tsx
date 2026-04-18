import { useState, useEffect } from "react";

interface ToastProps {
  message: string;
  type: "error" | "success" | "info";
  duration?: number;
  onClose?: () => void;
}

export const Toast = ({
  message,
  type,
  duration = 5000,
  onClose,
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const baseClasses =
    "fixed bottom-4 right-4 z-50 rounded-lg px-4 py-3 text-sm font-medium shadow-lg animation";

  const typeClasses = {
    error: "bg-red-500 text-white",
    success: "bg-green-500 text-white",
    info: "bg-blue-500 text-white",
  };

  return (
    <div
      className={`${baseClasses} ${typeClasses[type]} animate-in slide-in-from-bottom-4 duration-300`}
      role="alert"
      aria-live="polite"
    >
      {message}
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  const [toast, setToast] = useState<ToastProps | null>(null);

  const showToast = (
    message: string,
    type: "error" | "success" | "info" = "info",
  ) => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  return { toast, showToast, hideToast };
};
