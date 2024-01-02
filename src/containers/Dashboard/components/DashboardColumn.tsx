import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useRequest from '@/hooks/useRequest';
import { closeAllModals, openModal } from '@/store/modalAtom';
import { CardProps, CardsProps } from '@/pages/api/mock';
import Card from '@/components/Card';
import DashboardColorDot from '@/components/DashboardColorDot';
import AddChip from '@/components/chips/AddChip';
import NumberChip from '@/components/chips/NumberChip';
import Confirm from '@/components/modal/Confirm';
import Form from '@/components/modal/Form';
import { EditCardButton } from '@/components/modal/FormComponents/CardViewDetail';
import Modal from '@/components/modal/Modal';
import { IconSettings } from '@/public/svgs';

interface Props {
  title: string;
  columnId: number;
}

function DashboardColumn({ title, columnId }: Props) {
  const [visible, setVisible] = useState(true);
  const [currentCursorId, setCurrentCursorId] = useState(0);
  const [list, setList] = useState<CardProps[]>([]);
  const size = 5;

  const { data: initialCardList } = useRequest<CardsProps>({
    deps: [columnId],
    skip: !columnId,
    options: {
      url: `cards`,
      params: { columnId: columnId, size: size },
      method: 'get',
    },
  });

  const { data: cardList } = useRequest<CardsProps>({
    deps: [columnId, currentCursorId],
    skip: !currentCursorId,
    options: {
      url: `cards`,
      params: { columnId: columnId, size: size, cursorId: currentCursorId },
      method: 'get',
    },
  });

  const handleClick = () => {
    if (!cardList || !cardList.cards) return;
    setCurrentCursorId(cardList.cursorId);
    setList((prev) => [...prev, ...cardList.cards]);
    if (cardList.cursorId === currentCursorId || cardList.cards.length < size) {
      setVisible(false);
      return;
    }
  };

  const containerRef = useInfiniteScroll({
    handleScroll: handleClick,
    deps: [initialCardList, cardList],
  });

  useEffect(() => {
    if (!initialCardList) return;
    setList(initialCardList.cards);
    setCurrentCursorId(initialCardList.cursorId);
  }, [initialCardList]);

  if (!initialCardList || initialCardList.cards === undefined) return;

  return (
    <div className='flex w-full flex-col border-gray-2 pc:w-354 pc:border-r'>
      <ColumnInfo
        title={title}
        totalCount={initialCardList.totalCount}
        columnId={columnId}
      />
      <div className='flex flex-col gap-10 border-b border-gray-2 px-12 pb-12 tablet:gap-16 tablet:px-20 tablet:pb-20 pc:border-b-0'>
        <AddCardButton columnId={columnId} />
        {initialCardList.totalCount !== 0 &&
          list.map((card: CardProps, key: number) => {
            return <Card data={card} key={key} title={title} />;
          })}
        {visible && <SeeMore handleClick={handleClick} />}
        {visible && (
          <div ref={containerRef} className='hidden h-10 pc:inline' />
        )}
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
        <DashboardColorDot color='#5534DA' />
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

function SeeMore({ handleClick }: { handleClick: () => void }) {
  return (
    <div className='flex w-full justify-end pc:hidden'>
      <button
        onClick={handleClick}
        className='body2-bold w-fit px-5 text-gray-5 hover:underline'
      >
        더보기
      </button>
    </div>
  );
}
