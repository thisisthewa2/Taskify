import React from 'react';
import { Button } from '@/components/buttons';
import Input from '@/components/inputs/Input';

interface Props {
  onCloseModal: () => void;
  type: 'create' | 'edit';
}

function ColumnForm({ onCloseModal, type = 'create' }: Props) {
  const title = type === 'edit' ? '컬럼 관리' : '새 컬럼 생성';
  return (
    <>
      <h1 className='heading1-bold'>{title}</h1>
      <Input type='text' title='이름' placeholder='이름을 입력해 주세요' />
      {type === 'edit' && (
        <button
          type='button'
          className='absolute bottom-0 left-0 text-14 text-gray-4 underline'
        >
          삭제하기
        </button>
      )}

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

export default ColumnForm;
