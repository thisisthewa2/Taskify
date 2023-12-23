import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { InputComponents } from '@/components/inputs/InputComponents';

export type Props = {
  title?: string;
  required?: boolean;
  value?: string | number;
  type?: 'text' | 'date' | 'tag' | 'textarea';
  placeholder?: string;
  children?: React.ReactNode;
  onInput?: React.ChangeEventHandler<HTMLInputElement>;
  tagList?: string[];
  setTagList?: (tagList: string[]) => void;
};

function Label({ title, required }: Props) {
  return (
    <label className='text-[18px] font-[500]'>
      {title}
      {required ? <span className='text-[#5534DA]'> *</span> : ''}
    </label>
  );
}

function SelectedInput({
  type,
  required = false,
  children,
  tagList,
  setTagList,
  ...rest
}: Props) {
  switch (type) {
    case 'text':
      return (
        <InputComponents.TextInput required={required} {...rest}>
          {children}
        </InputComponents.TextInput>
      );
    case 'date':
      return <InputComponents.DateInput required={required} />;
    case 'textarea':
      return (
        <InputComponents.Textarea required={required} {...rest}>
          {children}
        </InputComponents.Textarea>
      );
    case 'tag':
      return (
        <InputComponents.TagInput
          tagList={tagList}
          setTagList={setTagList}
          {...rest}
        >
          {children}
        </InputComponents.TagInput>
      );
  }
}

function Input({
  title,
  type = 'text',
  required = false,
  children,
  tagList,
  setTagList,
  ...rest
}: Props) {
  return (
    <div className='flex flex-col gap-[10px]'>
      <Label title={title} required={required} />
      {type === 'tag' ? (
        <SelectedInput
          tagList={tagList}
          setTagList={setTagList}
          required={required}
          type={type}
          {...rest}
        >
          {children}
        </SelectedInput>
      ) : (
        <SelectedInput required={required} type={type} {...rest}>
          {children}
        </SelectedInput>
      )}
    </div>
  );
}

export default Input;
