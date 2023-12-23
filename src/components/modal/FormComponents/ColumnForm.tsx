import React from 'react';
import { Button } from '@/components/buttons';
import Input from '@/components/inputs/Input';

interface Props {
  onCloseModal: () => void;
  children?: React.ReactNode;
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

export default ColumnForm;
