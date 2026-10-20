"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { FiX } from "react-icons/fi";

export default function ImageViewer({
  image,
  onClose,
}: {
  image: { src: string; name: string } | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (image && dialog && !dialog.open) dialog.showModal();
    if (!image && dialog?.open) dialog.close();
  }, [image]);
  return (
    <dialog
      ref={ref}
      className="image-dialog"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) ref.current?.close();
      }}
      aria-labelledby="image-dialog-title"
    >
      {image && (
        <div className="image-dialog-content">
          <div className="image-dialog-header">
            <span id="image-dialog-title">{image.name}</span>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label="Cerrar vista previa"
            >
              <FiX />
            </button>
          </div>
          <Image
            src={image.src}
            alt={`Vista ampliada del proyecto ${image.name}`}
            width={1400}
            height={1000}
            sizes="90vw"
            className="image-dialog-image"
          />
        </div>
      )}
    </dialog>
  );
}
