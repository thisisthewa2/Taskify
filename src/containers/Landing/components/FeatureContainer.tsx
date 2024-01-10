import InviteImage from '@/public/webps/invite.webp';
import MemberImage from '@/public/webps/members.webp';
import SettingImage from '@/public/webps/setting.webp';
import FeatureSection from './FeatureSection';

function FeatureContainer() {
  return (
    <div className='flex flex-col pc:flex-row'>
      <FeatureSection
        imageUrl={SettingImage.src}
        title={'대시보드 설정'}
        description={'대시보드 사진과 이름을 변경할 수 있어요.'}
      />
      <FeatureSection
        imageUrl={InviteImage.src}
        title={'초대'}
        description={'새로운 팀원을 초대할 수 있어요.'}
      />
      <FeatureSection
        imageUrl={MemberImage.src}
        title={'구성원'}
        description={'구성원을 초대하고 내보낼 수 있어요.'}
      />
    </div>
  );
}
export default FeatureContainer;
