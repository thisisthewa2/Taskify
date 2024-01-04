import { useAtom, useAtomValue, useSetAtom } from 'jotai/index';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useRequest from '@/hooks/useRequest';
import { cardAtom } from '@/store/cardAtom';
import { CardStateAtom } from '@/store/createCardAtom';
import { ImageUrlAtom } from '@/store/imageUrlAtom';
import { CardProps } from '@/pages/api/mock';
import { Button } from '@/components/buttons';
import ManagerDropdown from '@/components/dropdowns/ManagerDropdown';
import StateDropdown from '@/components/dropdowns/StateDropdown';
import ImageDrop from '@/components/image-drop/ImageDrop';
import Input from '@/components/inputs/Input';

interface Props {
  onCloseModal: () => void;
  type: 'create' | 'edit';
  columnId: number;
  cardId?: number;
  cardData?: CardProps;
  list?: CardProps[];
  setList: Dispatch<SetStateAction<CardProps[]>>;
}

interface FormValues {
  assigneeUserId?: number;
  dashboardId?: number;
  columnId?: number;

  title?: string;
  description?: string;
  dueDate?: string;
  tags?: string[];
  imageUrl?: string;
}

function TodoForm({
  onCloseModal,
  type = 'create',
  columnId,
  cardId,
  cardData,
  setList,
}: Props) {
  const card = useAtomValue(cardAtom);
  console.log('card >>', card);

  const router = useRouter();
  const dashboardId = router.query.dashboardId ? +router.query.dashboardId : 0;

  const { imageUrl } = useAtomValue(ImageUrlAtom);

  let initialValues: FormValues = {
    columnId,
    dashboardId,
    imageUrl,
  };

  if (type === 'edit') {
    initialValues = { ...card };
  }

  const [tagList, setTagList] = useState<string[]>(
    card && type === 'edit' ? [...card.tags] : [],
  );
  const [values, setValues] = useState<FormValues>(initialValues);
  const [isCreateCard, setIsCreateCard] = useAtom(CardStateAtom);
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {},
    mode: 'onBlur',
  });

  const handleSetTagList = (newTagList: string[]) => {
    setTagList(newTagList);
    setValues((preValues) => ({
      ...preValues,
      tags: newTagList,
    }));
  };

  const handleSetDate = (date: string) => {
    setValues((preValues) => ({
      ...preValues,
      dueDate: date,
    }));
  };

  const handleSetManager = (assigneeUserId: number) => {
    setValues((preValues) => ({
      ...preValues,
      assigneeUserId,
    }));
  };

  const handleSetState = (newColumnId: number) => {
    console.log(newColumnId);
  };

  const title = type === 'edit' ? '할 일 수정' : '할 일 생성';

  const handleValuesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((preValues) => ({
      ...preValues,
      [name]: value,
    }));
  };

  const { fetch: postData } = useRequest<CardProps>({
    skip: true,
    options: { url: 'cards/', method: 'post' },
  });

  useEffect(() => {
    setValues((preValues) => ({
      ...preValues,
      imageUrl,
    }));
  }, [imageUrl]);

  // const changeTodo: SubmitHandler<FormValues> = async (formData) => {
  //   const newTodo = {
  //     assigneeUserId: formData.assigneeUserId ?? '',
  //     dashboardId: formData.dashboardId ?? '',
  //     columnId: formData.columnId ?? '',
  //     title: formData.title ?? '',
  //     description: formData.description ?? '',
  //     dueDate: formData.dueDate ?? '',
  //     tags: formData.tags ?? '',
  //     imageUrl: imageUrl ?? '',
  //   };
  //
  //   setValues((preValues) => ({
  //     ...preValues,
  //     imageUrl,
  //   }));
  //
  //   //
  //   const { error } = await fetch({
  //     data: newTodo,
  //   });
  //   //
  //   // if (error) {
  //   //   return;
  //   // }
  // };

  const handleCreateTodo = async () => {
    let hasError = false;

    try {
      const { data } = await postData({
        data: { ...values },
      });

      if (!data) return;
      onCloseModal();
      setList((prev) => [...prev, data]);
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <form className='mb-70 flex flex-col gap-30'>
      <h1 className='heading1-bold'>{title}</h1>
      <div className='flex gap-12'>
        {type === 'edit' && <StateDropdown handleSetState={handleSetState} />}

        <ManagerDropdown handleSetManager={handleSetManager} />
      </div>
      <Input
        type='text'
        title='제목'
        required={true}
        placeholder='제목을 입력해 주세요'
        name='title'
        onInput={handleValuesChange}
        value={values.title}
      />
      <Input
        type='textarea'
        title='설명'
        required={true}
        placeholder='설명을 입력해 주세요'
        name='description'
        onInput={handleValuesChange}
        value={values.description}
      />
      <Input
        type='date'
        title='마감일'
        name='dueDate'
        handleSetDate={handleSetDate}
        value={values.dueDate}
      />
      <Input
        type='tag'
        title='태그'
        setTagList={handleSetTagList}
        placeholder='입력 후 Enter'
        tagList={tagList}
        name='tags'
      />
      <div>
        <label className='text-[18px] font-[500]'>이미지</label>
        <ImageDrop type={'modal'} columnId={columnId} />
      </div>
      <div className='absolute bottom-0 flex gap-10 tablet:right-0'>
        <Button.Secondary type='button' size='lg' onClick={onCloseModal}>
          취소
        </Button.Secondary>
        {type === 'edit' ? (
          <Button type='button' size='lg'>
            수정
          </Button>
        ) : (
          <Button type='button' size='lg' onClick={handleCreateTodo}>
            생성
          </Button>
        )}
      </div>
    </form>
  );
}

export default TodoForm;
