import { useAtom } from 'jotai';
import React, { cloneElement, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { ModalAtom } from '@/store/modalAtom';

type ModalContextType = {
  openNames: string[];
  close: (name: string) => void;
  closeAll: () => void;
  open: (name: string) => void;
};

interface ModalProps {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

interface OpenProps extends ModalProps {
  opens: string;
}

interface BodyProps extends ModalProps {
  name: string;
}

const ModalContext = createContext<ModalContextType>({
  openNames: [],
  open: () => {},
  close: () => {},
  closeAll: () => {},
});

function Open({ children, opens: opensWindowName }: OpenProps) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }: BodyProps) {
  const { openNames, close, closeAll } = useContext(ModalContext);
  if (!openNames.includes(name)) return null;

  return createPortal(
    <div>
      <Backdrop />
      <div className='modal'>
        <div>
          {cloneElement(children, {
            onCloseModal: () => close(name),
            onCloseAllModal: closeAll,
          })}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function Backdrop() {
  return (
    <div className='fixed inset-0 flex h-full w-full items-center justify-center bg-black opacity-50' />
  );
}

function Modal({ children }: ModalProps) {
  const [openNames, setOpenNames] = useAtom(ModalAtom);
  const open = (name: string) => {
    if (!openNames.openName.includes(name)) {
      setOpenNames({ openName: [...openNames.openName, name] });
    }
  };

  const close = (name: string) => {
    setOpenNames({ openName: openNames.openName.filter((n) => n !== name) });
  };

  const closeAll = () => {
    setOpenNames({ openName: [] });
  };

  return (
    <ModalContext.Provider
      value={{ openNames: openNames.openName, close, closeAll, open }}
    >
      {children}
    </ModalContext.Provider>
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
