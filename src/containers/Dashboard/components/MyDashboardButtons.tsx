import Link from 'next/link';
import { DashboardProps } from '@/pages/api/mock';
import DashboardButton from '@/components/buttons/DashboardButton';
import AddChip from '@/components/chips/AddChip';
import Form from '@/components/modal/Form';
import Modal from '@/components/modal/Modal';
import ArrowButtonPageChange from './ArrowButtonPageChange';
import MyDashboardButton from './MyDashboardButton';

interface ButtonProps {
  data: DashboardProps[];
  totalCount: number;
  fetch: () => void;
  currentPage: number;
  setCurrentPage: (arg: number) => void;
}

function MyDashboardButtons({
  data,
  totalCount,
  fetch,
  currentPage,
  setCurrentPage,
}: ButtonProps) {
  return (
    <div className='grid grid-flow-row gap-8 tablet:grid-cols-2 pc:grid-cols-3'>
      {currentPage == 1 && <NewDashboardButton fetch={fetch} />}
      {data.map((dashBoard, key: number) => (
        <div key={key}>
          <Link href={`dashboard/${dashBoard.id}`}>
            <MyDashboardButton data={dashBoard} />
          </Link>
        </div>
      ))}
      {totalCount > 0 && (
        <ArrowButtonPageChange
          totalCount={totalCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}

export default MyDashboardButtons;

function NewDashboardButton({ fetch }: { fetch: () => void }) {
  return (
    <Modal>
      <>
        <Modal.Open opens='modal-form'>
          <DashboardButton>
            <div className='mx-12 flex items-center gap-15'>
              새로운 대시 보드
              <AddChip />
            </div>
          </DashboardButton>
        </Modal.Open>
        <Modal.Window name='modal-form'>
          <Form>
            <Form.DashboardForm fetch={fetch} />
          </Form>
        </Modal.Window>
      </>
    </Modal>
  );
}
