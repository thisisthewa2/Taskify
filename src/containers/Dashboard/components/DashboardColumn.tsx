import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement, ReactNode, useEffect } from 'react';
import useRequest from '@/hooks/useRequest';
import {
  ModalAtom,
  closeAllModals,
  closeModal,
  openModal,
} from '@/store/modalAtom';
import { CardProps, CardsProps } from '@/pages/api/mock';
import Card from '@/components/Card';
import DashboardColorDot from '@/components/DashboardColorDot';
import AddChip from '@/components/chips/AddChip';
import NumberChip from '@/components/chips/NumberChip';
import Input from '@/components/inputs/Input';
import Confirm from '@/components/modal/Confirm';
import Form from '@/components/modal/Form';
import { EditCardButton } from '@/components/modal/FormComponents/CardViewDetail';
import Modal from '@/components/modal/Modal';
import { IconSettings } from '@/public/svgs';

function DashboardColumn({
  title,
  columnId,
}: {
  title: string;
  columnId: number;
}) {
  const { data: cardList, fetch: getCards } = useRequest<
    CardsProps | undefined
  >({
    skip: true,
    options: {
      url: `cards?size=10&columnId=${columnId}`,
      method: 'get',
    },
  });

  useEffect(() => {
    if (!columnId) return;
    getCards();
  }, [columnId]);

  if (!cardList) return;

  return (
    <div className='flex w-full flex-col border-gray-2 pc:w-354 pc:border-r'>
      <ColumnInfo
        title={title}
        totalCount={cardList.totalCount}
        columnId={columnId}
      />
      <div className='flex flex-col gap-10 border-b border-gray-2 px-12 pb-12 tablet:gap-16 tablet:px-20 tablet:pb-20 pc:border-b-0'>
        <AddCardButton columnId={columnId} />
        {cardList &&
          cardList.totalCount !== 0 &&
          cardList.cards.map((card: CardProps, key: number) => {
            return <Card data={card} key={key} title={title} />;
          })}
      </div>
    </div>
  );
}

export default DashboardColumn;

function ColumnInfo({
  title,
  totalCount,
  columnId,
}: {
  title: string;
  totalCount: number;
  columnId: number;
}) {
  return (
    <div className='flex w-full items-center justify-between py-5 pr-12 tablet:py-20 tablet:pl-8 tablet:pr-20'>
      <div className='flex items-center'>
        <DashboardColorDot color='primary' />
        <p className='subheading-bold pr-12 tablet:pr-20'>{title}</p>
        <NumberChip num={totalCount} />
      </div>
      <ManageButton title={title} columnId={columnId} />
      <DeleteCardButton columnId={columnId} isHidden={true} />
      <EditCardButton columnId={columnId} isHidden={false} />
    </div>
  );
}

function AddCardButton({ columnId }: { columnId: number }) {
  const [, open] = useAtom(openModal);
  const handleCreateModal = () => {
    open(`addCard${columnId}`);
  };
  return (
    <Modal>
      <>
        <Modal.Open opens={`addCard${columnId}`}>
          <button className='card flex-center py-9' onClick={handleCreateModal}>
            <AddChip />
          </button>
        </Modal.Open>
        <Modal.Window name={`addCard${columnId}`}>
          <Form>
            <Form.TodoForm type='create' />
          </Form>
        </Modal.Window>
      </>
    </Modal>
  );
}

interface ManageButtonType {
  title: string;
  columnId: number;
}

function ManageButton({ title, columnId }: ManageButtonType) {
  const [, open] = useAtom(openModal);

  const handleEditModal = () => {
    open(`edit${columnId}`);
  };
  return (
    <Modal>
      <>
        <Modal.Open opens={`edit${columnId}`}>
          <button onClick={handleEditModal}>
            <IconSettings />
          </button>
        </Modal.Open>
        <Modal.Window name={`edit${columnId}`}>
          <Form>
            <Form.ColumnForm
              type='edit'
              columnName={title}
              columnId={columnId}
            />
          </Form>
        </Modal.Window>
      </>
    </Modal>
  );
}

export function DeleteCardButton({
  handleReset,
  columnId,
  isHidden: isNone,
}: {
  handleReset?: () => void;
  columnId?: number;
  isHidden: boolean;
}) {
  const [, open] = useAtom(openModal);
  const [, close] = useAtom(closeModal);
  const [, closeAll] = useAtom(closeAllModals);

  const handleDeleteModal = () => {
    closeAll();

    open(`delete${columnId}`);
  };

  return (
    <Modal>
      <>
        <Modal.Open opens={`delete${columnId}`}>
          <button
            type='button'
            className={`absolute bottom-0 left-0 text-14 text-gray-4 underline  ${
              isNone && '-z-base opacity-0'
            }`}
            onClick={handleDeleteModal}
          >
            삭제하기
          </button>
        </Modal.Open>
        <Modal.Window name={`delete${columnId}`}>
          <Confirm>
            <Confirm.DeleteConfirm
              columnId={columnId}
              onCloseModal={handleReset}
            />
          </Confirm>
        </Modal.Window>
      </>
    </Modal>
  );
}
