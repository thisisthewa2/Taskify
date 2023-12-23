import React, { useEffect, useState } from 'react';
import { Button } from '@/components/buttons';
import ColorChip from '@/components/chips/ColorChip';
import ManagerDropdown from '@/components/dropdowns/ManagerDropdown';
import ImageDrop from '@/components/image-drop/ImageDrop';
import Input from '@/components/inputs/Input';

interface Props {
  onCloseModal: () => void;
  children?: React.ReactNode;
}

function Form({ onCloseModal, children }: Props) {
  const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child as React.ReactElement<any>, { onCloseModal }),
  );
  return (
    <div className='relative flex min-h-[12rem] flex-col bg-scroll tablet:min-h-[14rem]'>
      <form className='mb-70 flex flex-col gap-30'>{childrenWithProps}</form>
    </div>
  );
}

function DashboardForm({ onCloseModal }: Props) {
  return (
    <>
      <h1 className='heading1-bold'>새로운 대시보드</h1>
      <div>
        <Input
          type='text'
          title='대시보드 이름'
          placeholder='이름을 입력해 주세요'
        />
        <div className='py-20'>
          <ColorChip />
        </div>
      </div>

      <div className='absolute bottom-0 flex gap-10 tablet:right-0'>
        <Button.Secondary size='lg' onClick={onCloseModal}>
          취소
        </Button.Secondary>
        <Button size='lg' onClick={onCloseModal}>
          생성
        </Button>
      </div>
    </>
  );
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

function ColumnForm({ onCloseModal }: Props) {
  return (
    <>
      <h1 className='heading1-bold'>새 컬럼 생성</h1>
      <Input type='text' title='이름' placeholder='이름을 입력해 주세요' />
      <div className='absolute bottom-0 flex gap-10 tablet:right-0'>
        <Button.Secondary size='lg' onClick={onCloseModal}>
          취소
        </Button.Secondary>
        <Button size='lg' onClick={onCloseModal}>
          생성
        </Button>
      </div>
    </>
  );
}

Form.DashboardForm = DashboardForm;
Form.TodoForm = TodoForm;
Form.ColumnForm = ColumnForm;

export default Form;
