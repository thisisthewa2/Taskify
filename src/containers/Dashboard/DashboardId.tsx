import { useAtom, useAtomValue } from 'jotai';
import useRequest from '@/hooks/useRequest';
import { ColumnsAtom } from '@/store/columnsAtom';
import { openModal } from '@/store/modalAtom';
import {
  ColumnProps,
  ColumnsProps,
  GetDashboardInfoType,
} from '@/pages/api/mock';
import AddChip from '@/components/chips/AddChip';
import Form from '@/components/modal/Form';
import Modal from '@/components/modal/Modal';
import DashboardColumn from './components/DashboardColumn';

interface DashboardProps {
  id: string;
}

function Dashboard({ id }: DashboardProps) {
  const { columnTitle } = useAtomValue(ColumnsAtom);
  const { data: columnsResponse, fetch: getColumns } = useRequest<
    ColumnsProps | undefined
  >({
    skip: !id,
    options: {
      url: `columns?dashboardId=${id}`,
      method: 'get',
    },
    deps: [id, columnTitle],
  });

  const { data: dashboardInfo, fetch: getDashboardInfo } = useRequest<
    GetDashboardInfoType | undefined
  >({
    skip: !id,
    options: {
      url: `dashboards/${id}`,
      method: 'get',
    },
    deps: [id, columnTitle],
  });

  if (!columnsResponse || !columnsResponse.result || !dashboardInfo) return;

  return (
    <div className='flex min-h-screen min-w-fit flex-col pc:flex-row'>
      {columnsResponse.data.map((column: ColumnProps, key: number) => {
        return (
          <DashboardColumn
            columnId={column.id}
            title={column.title}
            key={key}
          />
        );
      })}
      <AddColumnButton />
    </div>
  );
}

export default Dashboard;

function AddColumnButton() {
  const [, open] = useAtom(openModal);

  const handleEditModal = () => {
    open('addColumn');
  };
  return (
    <Modal>
      <>
        <Modal.Open opens='addColumn'>
          <button
            className='card flex-center m-12 max-w-full gap-10 p-20 tablet:m-20 tablet:h-70 pc:mt-67 pc:w-354 pc:border-r'
            onClick={handleEditModal}
          >
            <p className='subheading-bold'>새로운 컬럼 추가하기</p>
            <AddChip />
          </button>
        </Modal.Open>
        <Modal.Window name='addColumn'>
          <Form>
            <Form.ColumnForm />
          </Form>
        </Modal.Window>
      </>
    </Modal>
  );
}
