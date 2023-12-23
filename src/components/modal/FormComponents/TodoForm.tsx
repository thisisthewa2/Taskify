import React, { useState } from 'react';
import { Button } from '@/components/buttons';
import ManagerDropdown from '@/components/dropdowns/ManagerDropdown';
import ImageDrop from '@/components/image-drop/ImageDrop';
import Input from '@/components/inputs/Input';

interface Props {
  onCloseModal: () => void;
  children?: React.ReactNode;
}

function TodoForm({ onCloseModal }: Props) {
  const [tagList, setTagList] = useState<string[]>([]);

  const handleSetTagList = (newTagList: string[]) => {
    setTagList(newTagList);
  };

  return (
    <>
      <h1 className='heading1-bold'>할 일 생성</h1>
      <ManagerDropdown />
      <Input
        type='text'
        title='제목'
        required={true}
        placeholder='제목을 입력해 주세요'
      />
      <Input
        type='textarea'
        title='설명'
        required={true}
        placeholder='설명을 입력해 주세요'
      />
      <Input type='date' title='마감일' />
      <Input
        type='tag'
        title='태그'
        setTagList={handleSetTagList}
        placeholder='입력 후 Enter'
        tagList={tagList}
      />
      <div>
        <label className='text-[18px] font-[500]'>이미지</label>
        <ImageDrop type={'modal'} columnId={4} />
      </div>
      <div className='absolute bottom-0 flex gap-10 tablet:right-0'>
        <Button.Secondary type='button' size='lg' onClick={onCloseModal}>
          취소
        </Button.Secondary>
        <Button type='button' size='lg'>
          생성
        </Button>
      </div>
    </>
  );
}

export default TodoForm;
