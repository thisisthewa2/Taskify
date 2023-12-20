import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Input({
  title,
  type = 'text',
  required,
  children,
  ...rest
}: {
  title: string;
  value: string | number;
  type: 'text' | 'date' | 'tag';
  required: boolean;
  placeholder: string;
  children?: React.ReactNode;
  onInput?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const [startDate, setStartDate] = useState('');
  const inputs: {
    text: React.ReactNode;
    date: React.ReactNode;
    tag: React.ReactNode;
  } = {
    text: (
      <div className='flex flex-col gap-[10px]'>
        <label className='text-[18px] font-[500]'>
          {title}
          {required ? <span className='text-[#5534DA]'> *</span> : ''}
        </label>

        <input className='input' {...rest}>
          {children}
        </input>
      </div>
    ),
    date: (
      <div className='flex flex-col gap-[10px]'>
        <label className='text-[18px] font-[500]'>
          {title}
          {required ? <span className='text-[#5534DA]'> *</span> : ''}
        </label>
        <DatePicker
          dateFormat='yyyy.MM.dd HH:mm'
          dateFormatCalendar='yyyy년 MM월'
          showTimeSelect
          timeFormat='HH:mm'
          timeIntervals={30}
          timeCaption='시간'
          showPopperArrow={false}
          fixedHeight
          className='input'
          placeholderText='날짜를 입력해 주세요'
          showIcon
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          icon='fa fa-calendar'
        />
      </div>
    ),
    tag: (
      <div className='flex flex-col gap-[10px]'>
        <label className='text-[18px] font-[500]'>
          {title}
          {required ? <span className='text-[#5534DA]'> *</span> : ''}
        </label>

        <input className='input' {...rest}>
          {children}
        </input>
      </div>
    ),
  };
  return inputs[type];
}

export default Input;
