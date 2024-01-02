import { IconFacebook } from '@/public/svgs';

export default function Facebook() {
  const shareOnFacebook = () => {
    // 페이스북 공유 링크 URL 설정
    const shareUrl =
      'https://www.facebook.com/sharer/sharer.php?u=https://your-website.com';

    // 새 창에서 페이스북 공유 페이지 열기
    window.open(shareUrl, '_blank');
  };

  return (
    <button
      className='h-18 w-18 tablet:h-22 tablet:w-22'
      onClick={shareOnFacebook}
    >
      <IconFacebook width='100%' height='100%' viewBox='0 0 22 22' />
    </button>
  );
}
