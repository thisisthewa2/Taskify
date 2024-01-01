import { useEffect, useState } from 'react';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useRequest from '@/hooks/useRequest';
import { CardProps, CardsProps } from '@/pages/api/mock';
import Card from '@/components/Card';
import DashboardColorDot from '@/components/DashboardColorDot';
import AddChip from '@/components/chips/AddChip';
import NumberChip from '@/components/chips/NumberChip';
import Confirm from '@/components/modal/Confirm';
import Form from '@/components/modal/Form';
import Modal from '@/components/modal/Modal';
import { IconSettings } from '@/public/svgs';

interface Props {
  title: string;
  columnId: string;
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
    initialList: initialCardList?.cards,
    dependency: [initialCardList, cardList],
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
        <Modal>
          <AddCardButton />
        </Modal>
        {initialCardList.totalCount !== 0 &&
          list.map((card: CardProps, key: number) => {
            return <Card data={card} key={key} />;
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
  columnId: string;
}) {
  return (
    <div className='flex w-full items-center justify-between py-5 pr-12 tablet:py-20 tablet:pl-8 tablet:pr-20'>
      <div className='flex items-center'>
        <DashboardColorDot color='#5534DA' />
        <p className='subheading-bold pr-12 tablet:pr-20'>{title}</p>
        <NumberChip num={totalCount} />
      </div>
      <ManageButton title={title} columnId={columnId} />
    </div>
  );
}

function AddCardButton() {
  return (
    <Modal>
      <>
        <Modal.Open opens='add'>
          <button className='card flex-center py-9'>
            <AddChip />
          </button>
        </Modal.Open>
        <Modal.Window name='add'>
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
  columnId: string;
}

function ManageButton({ title, columnId }: ManageButtonType) {
  return (
    <Modal>
      <>
        <Modal.Open opens='edit'>
          <button>
            <IconSettings />
          </button>
        </Modal.Open>
        <Modal.Window name='edit'>
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
}: {
  handleReset: () => void;
  columnId?: string;
}) {
  return (
    <Modal>
      <>
        <Modal.Open opens='delete'>
          <button
            type='button'
            className='absolute bottom-0 left-0 text-14 text-gray-4 underline'
          >
            삭제하기
          </button>
        </Modal.Open>
        <Modal.Window name='delete'>
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
