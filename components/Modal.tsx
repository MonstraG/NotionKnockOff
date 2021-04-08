import { useRef, useEffect, FC } from "react";
import { createPortal } from "react-dom";

//based on https://www.jayfreestone.com/writing/react-portals-with-hooks/

const modalRootId = "modal-root";

function getRootElement(): HTMLDivElement {
  const existingRoot = document.getElementById(modalRootId);
  if (!existingRoot) {
    const root = document.createElement("div");
    root.setAttribute("id", modalRootId);
    document.body.appendChild(root);
    return root;
  }
  return existingRoot as HTMLDivElement;
}

const Modal: FC = ({ children }) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const rootElement = getRootElement();

    if (!modalRef.current) {
      modalRef.current = document.createElement("dialog");
    }
    // Add the detached element to the parent
    rootElement.appendChild(modalRef.current);

    return () => {
      if (modalRef.current) {
        modalRef.current.remove();
      }
    };
  }, []);

  if (modalRef.current == null) {
    return null;
  }
  return createPortal(children, modalRef.current);
};

export default Modal;
