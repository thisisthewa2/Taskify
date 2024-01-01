import { useAtom, useAtomValue } from 'jotai';
import { SetStateAction } from 'jotai/vanilla';
import { Dispatch, FocusEvent, useState } from 'react';
import useRequest from '@/hooks/useRequest';
import { CommentAtom } from '@/store/commentAtom';
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
  const [commentValue, setCommentValue] = useAtom(CommentAtom);
  const { author, updatedAt, content, id } = comment;
  const time = formatDate(updatedAt);
  const [isEdit, setIsEdit] = useState(false);
  const [defaultValue, setDefaultValue] = useState('');

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

  const { fetch: editComment } = useRequest({
    skip: true,
    options: {
      url: `comments/${id}`,
      method: 'put',
      data: { content: commentValue.comment },
    },
  });

  const handleDelete = async (commentId: number) => {
    await deleteComment();
    setCommentId(commentId);
  };

  const handleIsEdit = () => {
    setIsEdit(!isEdit);
    setCommentValue({ comment: content });
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setCommentValue({ comment: e.target.value });
    setDefaultValue(e.target.value);
  };

  const handleEdit = async () => {
    const { data } = await editComment();
    if (data) {
      setCommentValue({ comment: '' });
      setIsEdit(!isEdit);
    }
  };

  return (
    <div className='flex w-full justify-start gap-10'>
      <Members members={profile} totalCount={0} />
      <div className='flex w-full flex-col justify-start pt-8'>
        <div className='flex items-center justify-start gap-8'>
          <h3 className='body2-bold text-gray-7'>{author.nickname}</h3>
          <small className='caption-normal text-gray-4'>{time}</small>
        </div>
        {isEdit ? (
          <div className='flex flex-col'>
            <input
              className='input body2-normal mb-5 h-30'
              type='text'
              defaultValue={content}
              name='editInput'
              onBlur={handleBlur}
            />
            <div className='caption-normal flex items-center justify-start gap-12 text-gray-4 underline'>
              <div className='cursor-pointer' onClick={handleEdit}>
                확인
              </div>
              <div className='cursor-pointer' onClick={handleIsEdit}>
                취소
              </div>
            </div>
          </div>
        ) : (
          <p className='body2-normal mb-12 mt-6 text-gray-7'>{content}</p>
        )}
        {!isEdit && loginInfo.id === author.id && (
          <div className='caption-normal flex items-center justify-start gap-12 text-gray-4 underline'>
            <div className='cursor-pointer' onClick={handleIsEdit}>
              수정
            </div>
            <div className='cursor-pointer' onClick={() => handleDelete(id)}>
              삭제
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comments;
