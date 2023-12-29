import { useAtomValue } from 'jotai';
import Link from 'next/link';
import { loginAtom } from '@/store/loginAtom';
import Members from '../Members';
import { CommentsType } from '../modal/FormComponents/CardViewDetail';
import { formatDate } from './formatDate';

function Comments({ comment }: { comment: CommentsType }) {
  const loginInfo = useAtomValue(loginAtom);
  const { author, updatedAt, content } = comment;
  const time = formatDate(updatedAt);
  const profile = [
    {
      id: author.id,
      profileImageUrl: author.profileImageUrl || undefined,
      nickname: author.nickname,
    },
  ];
  console.log(loginInfo);
  return (
    <div className='flex items-start justify-start gap-10'>
      <Members members={profile} />
      <div className='flex flex-col items-start justify-start pt-8'>
        <div className='flex items-center justify-start gap-8'>
          <h3 className='body2-bold text-gray-7'>{author.nickname}</h3>
          <small className='caption-normal text-gray-4'>{time}</small>
        </div>
        <p className='body2-normal mb-12 mt-6 text-gray-7'>{content}</p>
        {loginInfo.id === author.id && (
          <div className='caption-normal flex items-center justify-start gap-12   text-gray-4 underline'>
            <Link href={'#none'}>수정</Link>
            <Link href={'#none'}>삭제</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comments;
