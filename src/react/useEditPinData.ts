import { useRef, useState } from "react";

export const useEditPinData = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [editingPin, setEditingPin] = useState<number | null>(null);

  return {
    dialogRef,
    editingPin,
    editPin: (pin: number) => {
      setEditingPin(pin);
      dialogRef.current?.showModal();
    },
  };
};
