import { useAtomValue } from 'jotai';
import Link from 'next/link';
import { useEffect } from 'react';
import useRequest from '@/hooks/useRequest';
import { loginAtom } from '@/store/loginAtom';
import { DashboardProps, MembersProps } from '@/pages/api/mock';
import Members from '@/components/Members';
import { Button } from '@/components/buttons';
import { IconAddBox, IconSettings } from '@/public/svgs';

interface Props {
  dashboardId?: string;
}

function DashboardHeader({ dashboardId }: Props) {
  const { data: dashboardInfo, fetch: getDashboardInfo } =
    useRequest<DashboardProps>({
      skip: true,
      options: {
        url: `dashboards/${dashboardId}`,
        method: 'get',
      },
    });

  const { data: dashboardMembers, fetch: getDashboardMembers } =
    useRequest<MembersProps>({
      skip: true,
      options: {
        url: 'members',
        method: 'get',
        params: {
          page: 1,
          size: 4,
          dashboardId: dashboardId ?? 1,
        },
      },
    });

  const title = dashboardId ? dashboardInfo?.title : '내 대시보드';

  useEffect(() => {
    if (dashboardId) {
      getDashboardInfo();
      getDashboardMembers();
    }
  }, [dashboardId]);

  return (
    <div className='flex h-60 w-full items-center justify-between border-b border-solid border-gray-3 bg-white pl-24 pr-12 tablet:h-70 tablet:px-40 pc:pr-80'>
      <div className='heading2-bold pl-4 pt-4'>{title}</div>
      <div className='flex-center body1-normal gap-12 tablet:gap-24'>
        {dashboardId && (
          <DashboardInfo
            createdByMe={dashboardInfo?.createdByMe}
            dashboardId={dashboardId}
            memberList={dashboardMembers}
          />
        )}
        <ProfileInfo />
      </div>
    </div>
  );
}

export default DashboardHeader;

function ProfileInfo() {
  const loginInfo = useAtomValue(loginAtom);
  const myProfile = {
    id: loginInfo.id ?? 1,
    nickname: loginInfo.nickname ?? '홍길동',
    profileImageUrl: loginInfo.profileImageUrl,
  };

  return (
    <div className='flex-center gap-12'>
      <Members members={[myProfile]} totalCount={1} />
      <div className='hidden tablet:block'>{myProfile.nickname}</div>
    </div>
  );
}

interface DashboardInfoProps {
  createdByMe?: boolean;
  memberList?: MembersProps;
  dashboardId: string;
}

function DashboardInfo({
  createdByMe = false,
  memberList,
  dashboardId,
}: DashboardInfoProps) {
  return (
    <div className='flex-center h-34 gap-16 border-r border-gray-3 pr-12 text-gray-5 tablet:h-38 tablet:gap-23 tablet:pr-24 pc:gap-40'>
      <DashboardManageButton
        createdByMe={createdByMe}
        dashboardId={dashboardId}
      />
      {memberList && (
        <Members
          members={memberList?.members}
          totalCount={memberList.totalCount}
        />
      )}
    </div>
  );
}

function DashboardManageButton({
  createdByMe = false,
  dashboardId,
}: DashboardInfoProps) {
  return (
    <div className='flex-center gap-16'>
      {createdByMe && (
        <Link href={`/dashboard/${dashboardId}/edit`}>
          <Button.Outline size='sm'>
            <div className='hidden pr-8 tablet:block'>
              <IconSettings />
            </div>
            관리
          </Button.Outline>
        </Link>
      )}
      <Button.Outline size='sm'>
        <div className='hidden pr-8 tablet:block'>
          <IconAddBox fill='#787486' />
        </div>
        초대하기
      </Button.Outline>
    </div>
  );
}