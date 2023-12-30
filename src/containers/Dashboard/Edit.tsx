import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import useRequest from '@/hooks/useRequest';
import { InvitationsProps, MembersProps } from '@/pages/api/mock';
import { Button } from '@/components/buttons';
import ColorChip from '@/components/chips/ColorChip';
import Table from '@/components/tables';
import { IconArrowBackward } from '@/public/svgs';

interface Props {
  dashboardId: string;
}

function DashboardEdit({ dashboardId }: Props) {
  const [currentMembersPage, setCurrentMembersPage] = useState(1);
  const [currentInvitationPage, setCurrentInvitationPage] = useState(1);

  const { data: memberList, fetch: getMemberList } = useRequest<MembersProps>({
    skip: !dashboardId,
    options: {
      url: `members`,
      params: { page: currentMembersPage, size: 5, dashboardId },
      method: 'get',
    },
    deps: [currentMembersPage, dashboardId],
  });

  const { data: invitationList, fetch: getInvitationList } =
    useRequest<InvitationsProps>({
      skip: !dashboardId,
      options: {
        url: `dashboards/${dashboardId}/invitations`,
        params: { page: currentInvitationPage, size: 5 },
        method: 'get',
      },
      deps: [currentInvitationPage, dashboardId],
    });

  if (!memberList || !invitationList) return;
  const { totalCount: membersTotalCount, members } = memberList;
  const { totalCount: invitationsCount, invitations } = invitationList;

  return (
    <div className='flex max-h-fit min-h-screen max-w-[41.25rem] flex-col gap-12 p-20'>
      <button className='flex-center body1-normal mb-8 w-80 gap-6'>
        <IconArrowBackward fill='#333236' />
        돌아가기
      </button>
      <TitleManageBox dashboardId={dashboardId} />
      <Table
        type='member'
        totalCount={membersTotalCount}
        data={members}
        setCurrentPage={setCurrentMembersPage}
        currentPage={currentMembersPage}
        fetch={getMemberList}
      />
      <Table
        type='invitation'
        data={invitations}
        totalCount={invitationsCount}
        setCurrentPage={setCurrentInvitationPage}
        currentPage={currentInvitationPage}
        fetch={getInvitationList}
      />
    </div>
  );
}

export default DashboardEdit;

interface DashboardInfo {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  createdByMe: boolean;
}

function TitleManageBox({ dashboardId }: Props) {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');

  const { data: dashboardInfo, fetch: getDashboardInfo } =
    useRequest<DashboardInfo>({
      skip: true,
      options: {
        url: `dashboards/${dashboardId}`,
        method: 'get',
      },
    });

  const { fetch: changeDashboardInfo } = useRequest({
    skip: true,
    options: {
      url: `dashboards/${dashboardId}`,
      method: 'put',
    },
  });

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleColorChange = (color: string) => {
    setColor(color);
  };

  const setDashboardInfo = async (e: SyntheticEvent) => {
    e.preventDefault();

    await changeDashboardInfo({
      data: {
        title: title ?? dashboardInfo?.title,
        color: color ?? dashboardInfo?.color,
      },
    });
    await getDashboardInfo();
  };

  useEffect(() => {
    getDashboardInfo();
  }, [dashboardId]);

  return (
    <form
      onSubmit={setDashboardInfo}
      className='flex flex-col gap-30 rounded-lg bg-white px-16 py-32'
    >
      <div className='flex items-center justify-between'>
        <span className='heading1-bold'>{dashboardInfo?.title}</span>
        <ColorChip onSelectColor={handleColorChange} />
      </div>
      <label className='subheading-normal'>
        대시보드 이름
        <input
          placeholder={dashboardInfo?.title}
          onChange={handleTitleChange}
          value={title}
          className='input mt-10'
        />
      </label>
      <div className='flex justify-end'>
        <Button>변경</Button>
      </div>
    </form>
  );
}
