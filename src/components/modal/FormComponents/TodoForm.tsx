import React, { useState } from 'react';
import useRequest from '@/hooks/useRequest';
import { Button } from '@/components/buttons';
import ManagerDropdown from '@/components/dropdowns/ManagerDropdown';
import StateDropdown from '@/components/dropdowns/StateDropdown';
import ImageDrop from '@/components/image-drop/ImageDrop';
import Input from '@/components/inputs/Input';

interface Props {
  onCloseModal: () => void;
  type: 'create' | 'edit';
}

function TodoForm({ onCloseModal, type = 'create' }: Props) {
  const [tagList, setTagList] = useState<string[]>([]);
  const [values, setValues] = useState({});

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
      date: date,
    }));
  };

  const title = type === 'edit' ? '할 일 수정' : '할 일 생성';

  const handleValuesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((preValues) => ({
      ...preValues,
      [name]: value,
    }));
  };

  const { fetch: postData } = useRequest({
    skip: true,
    options: { url: 'cards/', method: 'post' },
  });

  const handleCreateTodo = async () => {
    let hasError = false;
    console.log(values);
    // try {
    //   await postData({
    //     data: {
    //       assigneeUserId: 269,
    //       dashboardId: 497,
    //       columnId: 1587,
    //       title: 'header1생성',
    //       description: 'header1을 생성합니다.',
    //       dueDate: '2023-12-28 22:30',
    //       tags: tagList,
    //     },
    //   });
    //
    //   onCloseModal();
    // } catch (error) {
    //   console.error('Error', error);
    // }
  };

  return (
    <form className='mb-70 flex flex-col gap-30'>
      <h1 className='heading1-bold'>{title}</h1>
      <div className='flex gap-12'>
        {type === 'edit' && <StateDropdown />}

        <ManagerDropdown name='assigneeUserId' onInput={handleValuesChange} />
      </div>
      <Input
        type='text'
        title='제목'
        required={true}
        placeholder='제목을 입력해 주세요'
        name='title'
        onInput={handleValuesChange}
      />
      <Input
        type='textarea'
        title='설명'
        required={true}
        placeholder='설명을 입력해 주세요'
        name='description'
        onInput={handleValuesChange}
      />
      <Input
        type='date'
        title='마감일'
        name='dueDate'
        handleSetDate={handleSetDate}
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
        <ImageDrop type={'modal'} columnId={4} name='imageUrl' />
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
