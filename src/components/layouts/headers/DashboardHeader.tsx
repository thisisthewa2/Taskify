import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import useRequest from '@/hooks/useRequest';
import { themeAtom } from '@/store/colorSchemeAtom';
import { loginAtom } from '@/store/loginAtom';
import { openModal } from '@/store/modalAtom';
import { removeAccessToken } from '@/services/utils/handleToken';
import { DashboardProps, MembersProps } from '@/pages/api/mock';
import Members from '@/components/Members';
import { Button } from '@/components/buttons';
import Form from '@/components/modal/Form';
import Modal from '@/components/modal/Modal';
import { IconAddBox, IconCrown, IconSettings } from '@/public/svgs';

interface Props {
  dashboardId?: string;
}

function DashboardHeader({ dashboardId }: Props) {
  const toggleTheme = useSetAtom(themeAtom);

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
    <div className='sticky top-0 z-nav flex h-60 w-full items-center justify-between border-b border-solid border-gray-3 bg-white pl-24 pr-12 tablet:h-70 tablet:px-40 pc:pr-80'>
      <div className='heading2-bold flex items-center gap-8 pl-4 pt-4'>
        {title}
        <IconCrown
          className={
            dashboardInfo?.createdByMe ? 'inline flex-shrink-0' : 'hidden'
          }
        />
      </div>
      <div className='flex-center body1-normal gap-12 tablet:gap-24'>
        <button onClick={toggleTheme}>DARKMODE</button>
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
    <div className='flex-center group relative gap-12'>
      <Link href='/mypage' className='flex-center gap-12'>
        <Members members={[myProfile]} totalCount={1} />
        <div className='hidden tablet:block'>{myProfile.nickname}</div>
      </Link>
      <ProfilePopup />
    </div>
  );
}

function ProfilePopup() {
  const router = useRouter();
  const setLoginInfo = useSetAtom(loginAtom);

  const redirectMyPage = () => {
    router.push('/mypage');
  };

  const logout = () => {
    setLoginInfo({ isLoggedIn: false });
    removeAccessToken();
    router.push('/signin');
  };

  return (
    <div className='absolute -right-3 top-28 hidden bg-transparent pt-20 group-hover:block'>
      <div className='flex h-100 w-130 flex-col justify-center overflow-hidden rounded-sm bg-white shadow-popup'>
        <ProfilePopupButton onClick={redirectMyPage}>
          마이 페이지
        </ProfilePopupButton>
        <ProfilePopupButton onClick={logout}>로그아웃</ProfilePopupButton>
      </div>
    </div>
  );
}

interface ProfilePopupButtonProps {
  onClick: () => void;
  children: ReactNode;
}

function ProfilePopupButton({ onClick, children }: ProfilePopupButtonProps) {
  return (
    <button
      className='flex-center body1-normal h-50 w-full hover:bg-primary-light hover:text-primary'
      onClick={onClick}
    >
      {children}
    </button>
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
          members={memberList.members}
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
      <InvitationButton dashboardId={dashboardId} />
    </div>
  );
}

interface InvitationButtonProps {
  dashboardId: string;
}

function InvitationButton({ dashboardId }: InvitationButtonProps) {
  const [, open] = useAtom(openModal);

  const handleInviteModal = () => {
    open(`inviting modal${dashboardId}`);
  };
  return (
    <Modal>
      <>
        <Modal.Open opens={`inviting modal${dashboardId}`}>
          <Button.Outline size='sm' onClick={handleInviteModal}>
            <div className='hidden pr-8 tablet:block'>
              <IconAddBox fill='#787486' />
            </div>
            초대하기
          </Button.Outline>
        </Modal.Open>
        <Modal.Window name={`inviting modal${dashboardId}`}>
          <Form>
            <Form.InviteForm dashboardId={dashboardId} />
          </Form>
        </Modal.Window>
      </>
    </Modal>
  );
}
