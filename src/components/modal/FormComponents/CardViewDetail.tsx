import { useAtom, useAtomValue } from 'jotai';
import Image from 'next/image';
import { FormEvent, useEffect, useState } from 'react';
import useRequest from '@/hooks/useRequest';
import { CommentAtom } from '@/store/commentAtom';
import { CardProps } from '@/pages/api/mock';
import Members from '@/components/Members';
import { Button } from '@/components/buttons';
import StateChip from '@/components/chips/StateChip';
import TagChip from '@/components/chips/TagChip';
import Comments from '@/components/comment/Comments';
import Close from '@/components/icons/Close';
import Kebab from '@/components/icons/Kebab';
import Input from '@/components/inputs/Input';

interface Props {
  onCloseModal: () => void;
  cardData: CardProps;
  title: string;
}

interface CommentListType {
  cursorId?: number;
  comments: CommentsType[];
}

export interface CommentsType {
  author: {
    id: number;
    nickname: string;
    profileImageUrl?: string;
  };
  cardId: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  id: number;
}

interface CreateCommentType {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

function CardViewDetail({ onCloseModal, cardData, title }: Props) {
  const [commentValue, setCommentValue] = useAtom(CommentAtom);
  const [commentId, setCommentId] = useState(0);

  const {
    tags,
    description,
    imageUrl,
    assignee,
    dueDate,
    id: cardId,
    columnId,
    dashboardId,
  } = cardData;

  const profile = [
    {
      id: assignee.id,
      profileImageUrl: assignee.profileImageUrl || undefined,
      nickname: assignee.nickname,
    },
  ];

  const { data: commentList, fetch: getComments } = useRequest<CommentListType>(
    {
      skip: true,
      options: {
        url: `comments?size=1&cardId=${cardId}`,
        method: 'get',
      },
    },
  );
  const { fetch: createComment } = useRequest<CreateCommentType>({
    skip: true,
    options: {
      url: 'comments',
      method: 'post',
      data: {
        content: commentValue.comment,
        cardId: cardId,
        columnId: columnId,
        dashboardId: dashboardId,
      },
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await createComment();

    if (data) {
      setCommentValue({ comment: '' });
    }
  };

  useEffect(() => {
    getComments();
  }, [commentValue, commentId]);
  console.log(commentList);
  return (
    <form onSubmit={handleSubmit}>
      <div className='flex items-center justify-between'>
        <h2 className='heading1-bold text-gray-7'>새로운 일정 관리 Taskify</h2>
        <div className='flex items-center justify-between gap-24'>
          <Kebab />
          <Close onClick={onCloseModal} />
        </div>
      </div>
      <div className='flex items-start justify-between gap-24'>
        <div className='w-450'>
          <div className='mt-24 flex items-center justify-start'>
            <div className='border-r border-gray-3 pr-20'>
              <StateChip str={title} />
            </div>
            <ul className='flex flex-wrap items-center justify-start gap-6 pl-20'>
              {tags.map((tag, index) => {
                return <TagChip key={index} str={tag} />;
              })}
            </ul>
          </div>
          <p className='body2-normal my-16 text-gray-7'>{description}</p>
          {imageUrl && (
            <Image width={450} height={263} src={imageUrl} alt='이미지' />
          )}
          <div className='relative mb-20 mt-24'>
            <Input
              type='textarea'
              title='댓글'
              required={false}
              placeholder='댓글 작성하기'
            />
            <div className='absolute bottom-12 right-12'>
              <Button.Secondary size='md'>입력</Button.Secondary>
            </div>
          </div>
          <div className='flex flex-col items-start justify-start gap-10'>
            {commentList?.comments &&
              commentList.comments.map((comment) => {
                return (
                  <Comments
                    key={comment.id}
                    comment={comment}
                    setCommentId={setCommentId}
                  />
                );
              })}
          </div>
        </div>
        <div className='card mt-21 w-200 flex-shrink-0'>
          <h3 className='caption-bold mb-6 text-gray-7'>담당자</h3>
          <div className='body2-normal flex items-center justify-start gap-8'>
            <Members members={profile} />
            <h2 className='body2-normal text-gray-7'>{assignee.nickname}</h2>
          </div>
          <h3 className='caption-bold mb-6 mt-20 text-gray-7'>마감일</h3>
          <div className='caption-bold text-gray-7'>{dueDate}</div>
        </div>
      </div>
    </form>
  );
}

export default CardViewDetail;
