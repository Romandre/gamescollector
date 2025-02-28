import React from "react";
import { Button } from "./Button";
import { css } from "../../../styled-system/css";

interface DialogPromptProps {
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

export function DialogPrompt({
  message,
  onConfirm,
  onClose,
}: DialogPromptProps) {
  return (
    <div
      className={`modal ${css({
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -60%)",
        maxW: "400px",
        minW: "320px",
        p: 6,
        boxShadow: "0 0 20px rgba(0,0,0,0.6)",
        animation: "fade-in 0.3s",
        zIndex: 998,
      })}`}
    >
      <p className={css({ textAlign: "center" })}>{message}</p>
      <div className={css({ display: "flex", mt: 4, gap: 4 })}>
        <Button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Confirm
        </Button>
        <Button onClick={onClose} className="secondary">
          Cancel
        </Button>
      </div>
    </div>
  );
}
