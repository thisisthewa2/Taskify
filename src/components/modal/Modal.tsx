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
  openName: '',
  close: () => {},
  open: () => {},
});

const WINDOW_STYLE = {
  card: 'modal tablet:w-[45.6rem]',
  rest: 'modal',
};

function Open({ children, opens: opensWindowName }: OpenProps) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }: BodyProps) {
  const { openName, close } = useContext(ModalContext);
  if (name !== openName) return null;

  return createPortal(
    <div>
      <Backdrop />
      <div className={name === 'card' ? WINDOW_STYLE.card : WINDOW_STYLE.rest}>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
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
