import { IconInstagram } from '@/public/svgs';

export default function Instagram() {
  const shareOnInstagram = () => {
    // 인스타그램 앱을 열기 위한 링크
    const instagramUrl = 'instagram://app';

    // 인스타그램 앱이 설치되어 있는지 확인 후, 설치되어 있다면 해당 URL을 공유
    window.location.href = instagramUrl;
  };

  return (
    <button
      className='h-18 w-18 tablet:h-22 tablet:w-22'
      onClick={shareOnInstagram}
    >
      <IconInstagram width='100%' height='100%' viewBox='0 0 22 22' />
    </button>
  );
}
