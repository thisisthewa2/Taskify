import { useAtomValue } from 'jotai';
import { SetStateAction } from 'jotai/vanilla';
import { Dispatch } from 'react';
import useRequest from '@/hooks/useRequest';
import { loginAtom } from '@/store/loginAtom';
import Members from '../Members';
import { CommentsType } from '../modal/FormComponents/CardViewDetail';
import { formatDate } from './formatDate';

interface CommentType {
  comment: CommentsType;
  setCommentId: Dispatch<SetStateAction<number>>;
}

function Comments({ comment, setCommentId }: CommentType) {
  const loginInfo = useAtomValue(loginAtom);
  const { author, updatedAt, content, id } = comment;
  const time = formatDate(updatedAt);
  const profile = [
    {
      id: author.id,
      profileImageUrl: author.profileImageUrl || undefined,
      nickname: author.nickname,
    },
  ];

  const { fetch: deleteComment } = useRequest({
    skip: true,
    options: {
      url: `comments/${id}`,
      method: 'delete',
    },
  });

  /* const { fetch: editComment } = useRequest({
    skip: true,
    options: {
      url: `comments/${id}`,
      method: 'put',
      data: {content: ""}
    },
  }); */

  const handleDelete = async (commentId: number) => {
    await deleteComment();
    setCommentId(commentId);
  };

  const handleEdit = async (commentId: number) => {
    /* await editComment();
    setCommentId(commentId); */
  };

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
          <div className='caption-normal flex items-center justify-start gap-12 text-gray-4 underline'>
            <div onClick={() => handleEdit(id)}>수정</div>
            <div onClick={() => handleDelete(id)}>삭제</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comments;
