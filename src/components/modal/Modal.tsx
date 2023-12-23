import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

type ModalContextType = {
  openName: string;
  close: () => void;
  open: (name: string) => void;
};

type ModalProps = {
  children: React.ReactNode;
};

type OpenProps = {
  children: React.ReactElement;
  opens: string;
};

type BodyProps = {
  children: React.ReactElement;
  name: string;
};

const ModalContext = createContext<ModalContextType>({
  openName: '',
  close: () => {},
  open: () => {},
});

function Open({ children, opens: opensWindowName }: OpenProps) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }: BodyProps) {
  const { openName, close } = useContext(ModalContext);
  if (name !== openName) return null;

  return createPortal(
    <Backdrop>
      <div className='modal'>
        <button onClick={close}>X</button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </Backdrop>,
    document.body,
  );
}

function Backdrop({ children }: { children: React.ReactNode }) {
  return (
    <div className='z-9999 fixed inset-0 flex h-full w-full items-center justify-center bg-black opacity-50'>
      {children}
    </div>
  );
}

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = (name: string) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
