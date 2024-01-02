import { useAtom, useAtomValue } from 'jotai';
import Image from 'next/image';
import {
  Dispatch,
  FormEvent,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import useRequest from '@/hooks/useRequest';
import { ColumnsAtom } from '@/store/columnsAtom';
import { CommentAtom } from '@/store/commentAtom';
import { closeAllModals, openModal } from '@/store/modalAtom';
import { CardProps } from '@/pages/api/mock';
import Members from '@/components/Members';
import { Button } from '@/components/buttons';
import AddChip from '@/components/chips/AddChip';
import StateChip from '@/components/chips/StateChip';
import TagChip from '@/components/chips/TagChip';
import Comments from '@/components/comment/Comments';
import Close from '@/components/icons/Close';
import Kebab from '@/components/icons/Kebab';
import Input from '@/components/inputs/Input';
import { IconSettings } from '@/public/svgs';
import Confirm from '../Confirm';
import Form from '../Form';
import Modal from '../Modal';

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
  const [isKebab, setIsKebab] = useState(false);
  const [columnTitle, setColumnTitle] = useAtom(ColumnsAtom);

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
        url: `comments?size=10&cardId=${cardId}`,
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

  const handleKebab = () => {
    setIsKebab(!isKebab);
  };

  const handleKebabMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    console.log(111);
    e.preventDefault();
    setIsKebab(!isKebab);
  };

  const handleBlur = () => {
    console.log(2222);
    setTimeout(() => {
      setIsKebab(false);
    }, 200);
  };

  const handleReset = () => {
    onCloseModal();
    setColumnTitle({ columnTitle: '' });
  };

  useEffect(() => {
    getComments();
  }, [commentValue, commentId]);
  console.log(isKebab);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='flex items-center justify-between'>
          <h2 className='heading1-bold text-gray-7'>
            새로운 일정 관리 Taskify
          </h2>
          <div
            className='flex items-center justify-between gap-24'
            onBlur={handleBlur}
          >
            <label onClick={handleKebab}>
              <Kebab />
            </label>
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
          <div className='card mt-21 h-165 w-200 flex-shrink-0'>
            <h3 className='caption-bold mb-6 text-gray-7'>담당자</h3>
            <div className='body2-normal flex items-center justify-start gap-8'>
              <Members members={profile} totalCount={0} />
              <h2 className='body2-normal text-gray-7'>{assignee.nickname}</h2>
            </div>
            <h3 className='caption-bold mb-6 mt-20 text-gray-7'>마감일</h3>
            <div className='caption-bold text-gray-7'>{dueDate}</div>
          </div>
        </div>
      </form>
      {isKebab && (
        <KebabButton
          handleReset={handleReset}
          columnId={columnId}
          setIsKebab={setIsKebab}
        />
      )}
    </>
  );
}

export default CardViewDetail;

interface KebabListType {
  id: number;
  name: string;
}

const KEBABLIST: KebabListType[] = [
  { id: 1, name: '수정하기' },
  { id: 2, name: '삭제하기' },
];

function KebabButton({
  handleReset,
  columnId,
  setIsKebab,
}: {
  handleReset: () => void;
  columnId?: number;
  setIsKebab: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <ul className='card flex-center absolute right-60 top-30 h-82 w-93 flex-col p-6 '>
      {KEBABLIST.map((list) => {
        return list.id === 1 ? (
          <EditCardButton
            list={list}
            key={list.id}
            setIsKebab={setIsKebab}
            columnId={columnId}
            isHidden={true}
          />
        ) : (
          <DeleteCardButton
            key={list.id}
            handleReset={handleReset}
            columnId={columnId}
            list={list}
          />
        );
      })}
    </ul>
  );
}

function DeleteCardButton({
  handleReset,
  columnId,
  list,
}: {
  handleReset: () => void;
  columnId?: number;
  list: KebabListType;
}) {
  const [, open] = useAtom(openModal);
  const [, closeAll] = useAtom(closeAllModals);

  const handleDeleteModal = () => {
    closeAll();

    open(`delete${columnId}`);
  };
  return (
    <Modal>
      <>
        <Modal.Open opens={`delete${columnId}`}>
          <li
            className='flex-center body2-normal h-32 w-81 cursor-pointer rounded-sm hover:bg-primary-light'
            onClick={handleDeleteModal}
          >
            {list.name}
          </li>
        </Modal.Open>
        <Modal.Window name={`delete${columnId}`}>
          <Confirm>
            <Confirm.DeleteConfirm
              columnId={columnId}
              onCloseModal={handleReset}
            />
          </Confirm>
        </Modal.Window>
      </>
    </Modal>
  );
}

export function EditCardButton({
  list,
  setIsKebab,
  columnId,
  isHidden,
}: {
  list?: KebabListType;
  setIsKebab?: Dispatch<SetStateAction<boolean>>;
  columnId?: number;
  isHidden: boolean;
}) {
  /* const handleButtonClick = (e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    
  }; */
  const [, open] = useAtom(openModal);
  const [, closeAll] = useAtom(closeAllModals);
  const handleAddModal = () => {
    if (setIsKebab) {
      setIsKebab(false);
    }
    closeAll();
    setTimeout(() => {
      open(`addColumn${columnId}`);
    }, 4);
  };
  return (
    <Modal>
      <>
        <Modal.Open opens={`addColumn${columnId}`}>
          <li
            className={`flex-center body2-normal h-32 w-81 cursor-pointer rounded-sm hover:bg-primary-light ${
              !isHidden && '-z-base opacity-0'
            }`}
            onClick={handleAddModal}
          >
            {list && list.name}
          </li>
        </Modal.Open>
        <Modal.Window name={`addColumn${columnId}`}>
          <Form>
            <Form.TodoForm type='edit' />
          </Form>
        </Modal.Window>
      </>
    </Modal>
  );
}
