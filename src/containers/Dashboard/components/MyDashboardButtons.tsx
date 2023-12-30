import Link from 'next/link';
import { useState } from 'react';
import useRequest from '@/hooks/useRequest';
import { DashboardsProps } from '@/pages/api/mock';
import DashboardButton from '@/components/buttons/DashboardButton';
import AddChip from '@/components/chips/AddChip';
import Form from '@/components/modal/Form';
import Modal from '@/components/modal/Modal';
import ArrowButtonPageChange from './ArrowButtonPageChange';
import MyDashboardButton from './MyDashboardButton';

function MyDashboardButtons() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: dashboardsData, fetch: getDashboardsData } =
    useRequest<DashboardsProps>({
      deps: [currentPage],
      options: {
        url: 'dashboards',
        method: 'get',
        params: {
          navigationMethod: 'pagination',
          page: currentPage,
          size: 5, //currentPage === 1 ? 5 : 6,
        },
      },
    });

  if (!dashboardsData ?? !dashboardsData?.dashboards) return;
  const { dashboards, totalCount } = dashboardsData;

  return (
    <div className='grid grid-flow-row gap-8 tablet:grid-cols-2 pc:grid-cols-3'>
      <NewDashboardButton fetch={getDashboardsData} />
      {dashboards.map((dashBoard, key: number) => (
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
              새로운 대시보드
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
