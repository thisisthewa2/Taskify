import { useEffect } from 'react';
import useRequest from '@/hooks/useRequest';
import { CardProps, CardsProps } from '@/pages/api/mock';
import Card from '@/components/Card';
import DashBoardColorDot from '@/components/DashBoardColorDot';
import AddChip from '@/components/chips/AddChip';
import NumberChip from '@/components/chips/NumberChip';
import Form from '@/components/modal/Form';
import Modal from '@/components/modal/Modal';
import { IconSettings } from '@/public/svgs';

function DashboardColumn({
  title,
  columnId,
}: {
  title: string;
  columnId: string;
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
        <Modal>
          <AddCardButton />
        </Modal>
        {cardList &&
          cardList.totalCount !== 0 &&
          cardList.cards.map((card: CardProps, key: number) => {
            return <Card data={card} key={key} />;
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
  columnId: string;
}) {
  return (
    <div className='flex w-full items-center justify-between py-5 pr-12 tablet:py-20 tablet:pl-8 tablet:pr-20'>
      <div className='flex items-center'>
        <DashBoardColorDot color='primary' />
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
        <Modal.Open opens='modal-form'>
          <button className='card flex-center py-9'>
            <AddChip />
          </button>
        </Modal.Open>
        <Modal.Window name='modal-form'>
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
        <Modal.Open opens='modal-form'>
          <button>
            <IconSettings />
          </button>
        </Modal.Open>
        <Modal.Window name='modal-form'>
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
