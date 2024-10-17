// components/MessageBar.tsx
import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

type MessageBarProps = {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose: () => void;
};

export default function MessageBar({
  message,
  type = "info",
  duration = 5000,
  onClose,
}: MessageBarProps) {
  const [visible, setVisible] = useState(true);
  const [animation, setAnimation] = useState("animate-slide-in");

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setAnimation("animate-slide-out");
    setTimeout(() => {
      setVisible(false);
      onClose();
    }, 500);
  };

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  }[type];

  return (
    <>
      {visible && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded shadow-lg text-white ${bgColor} ${animation}`}
        >
          <span className="flex-1">{message}</span>
          <button onClick={handleClose}>
            <XMarkIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      )}
    </>
  );
}
