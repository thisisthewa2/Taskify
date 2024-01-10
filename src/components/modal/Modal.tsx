import { useAtomValue } from 'jotai';
import React, { cloneElement, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { ModalAtom } from '@/store/modalAtom';

type ModalContextType = {
  openNames: string[];
};

interface ModalProps {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

interface OpenProps extends ModalProps {
  opens?: string;
}

interface BodyProps extends ModalProps {
  name: string;
}

const ModalContext = createContext<ModalContextType>({
  openNames: [],
});

const WINDOW_STYLE = {
  card: 'modal tablet:w-[45.6rem] tablet:h-[51.875rem] overflow-auto custom-scrollbar',
  rest: 'modal',
};

function Open({ children }: OpenProps) {
  return cloneElement(children);
}

function Window({ children, name }: BodyProps) {
  const { openNames } = useContext(ModalContext);

  if (!openNames.includes(name)) return null;

  return createPortal(
    <div>
      <Backdrop />
      <div
        className={
          name.includes('card') ? WINDOW_STYLE.card : WINDOW_STYLE.rest
        }
      >
        <div>{cloneElement(children)}</div>
      </div>
    </div>,
    document.body,
  );
}

function Backdrop() {
  return (
    <div className='fixed inset-0 z-floating flex h-full w-full items-center justify-center bg-black opacity-50' />
  );
}

function Modal({ children }: ModalProps) {
  const openNames = useAtomValue(ModalAtom);

  return (
    <ModalContext.Provider value={{ openNames: openNames.openName }}>
      {children}
    </ModalContext.Provider>
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
