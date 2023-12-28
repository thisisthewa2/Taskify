import { SetStateAction, useAtomValue } from 'jotai';
import { useParams } from 'next/navigation';
import { Dispatch, useEffect } from 'react';
import useRequest from '@/hooks/useRequest';
import { ColumnsAtom } from '@/store/columnsAtom';
import {
  ColumnProps,
  ColumnsProps,
  GetDashboardInfoType,
  MembersProps,
} from '@/pages/api/mock';
import AddChip from '@/components/chips/AddChip';
import Form from '@/components/modal/Form';
import Modal from '@/components/modal/Modal';
import DashboardColumn from './components/DashboardColumn';

interface DashboardProps {
  id: string;
  setCreatedByMe: (arg: boolean) => void;
  setMembers: Dispatch<SetStateAction<MembersProps | undefined>>;
}

function Dashboard({ id, setCreatedByMe, setMembers }: DashboardProps) {
  const { columnTitle } = useAtomValue(ColumnsAtom);
  const { data: columnsResponse, fetch: getColumns } = useRequest<
    ColumnsProps | undefined
  >({
    skip: true,
    options: {
      url: `columns?dashboardId=${id}`,
      method: 'get',
    },
  });

  const { data: dashboardInfo, fetch: getDashboardInfo } = useRequest<
    GetDashboardInfoType | undefined
  >({
    skip: true,
    options: {
      url: `dashboards/${id}`,
      method: 'get',
    },
  });

  const { data: memberList, fetch: getMemberList } = useRequest<
    MembersProps | undefined
  >({
    skip: true,
    options: {
      url: `members?page=1&size=4&dashboardId=${id}`,
      method: 'get',
    },
  });

  useEffect(() => {
    if (!id) return;
    getColumns();
    getDashboardInfo();
    getMemberList();
    if (dashboardInfo?.createdByMe && memberList) {
      setCreatedByMe(true);
      setMembers(memberList);
    }
  }, [id, dashboardInfo?.createdByMe, columnTitle, memberList?.totalCount]);

  if (!columnsResponse || !columnsResponse.result || !dashboardInfo) return;

  return (
    <div className='flex min-h-screen flex-col pc:flex-row'>
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
  return (
    <Modal>
      <>
        <Modal.Open opens='modal-form'>
          <button className='card flex-center m-12 max-w-full gap-10 p-20 tablet:m-20 tablet:h-70 pc:mt-67 pc:w-354 pc:border-r'>
            <p className='subheading-bold'>새로운 컬럼 추가하기</p>
            <AddChip />
          </button>
        </Modal.Open>
        <Modal.Window name='modal-form'>
          <Form>
            <Form.ColumnForm />
          </Form>
        </Modal.Window>
      </>
    </Modal>
  );
}
