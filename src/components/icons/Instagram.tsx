import { IconInstagram } from '@/public/svgs';

export default function Instagram() {
  const shareToInstagram = () => {
    // 공유할 콘텐츠 URL
    var contentUrl = '여기에_콘텐츠_주소를_입력하세요';

    // 인스타그램으로 이동하는 링크 생성
    var instagramUrl =
      'https://www.instagram.com/create/story=' +
      encodeURIComponent(contentUrl);

    // 새 창에서 인스타그램으로 이동
    window.open(instagramUrl, '_blank');
  };
  return (
    <button
      className='h-18 w-18 tablet:h-22 tablet:w-22'
      onClick={shareToInstagram}
    >
      <IconInstagram width='100%' height='100%' viewBox='0 0 22 22' />
    </button>
  );
}
