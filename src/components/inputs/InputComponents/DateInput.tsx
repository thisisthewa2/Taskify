import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import dateFormat from '@/utils/dateFormat';
import { IconCalendar, IconGreater, IconLess } from '@/public/svgs';

function DateInput({
  required,
  handleSetDate,
}: {
  required: boolean;
  handleSetDate: (date: string) => void;
}) {
  const handleChange = (e: React.ChangeEvent) => {
    e.preventDefault();
  };
  const [value, setValue]: [Date | null, Function] = useState(null);
  const YEARS = Array.from(
    { length: new Date().getFullYear() + 1 - 2000 },
    (_, i) => new Date().getFullYear() - i,
  );
  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return (
    <DatePicker
      renderCustomHeader={({
        date,
        changeYear,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className='flex justify-between'>
          <div className='custom-header'>
            <span className='ml-12 font-bold'>{MONTHS[date.getMonth()]}</span>
            <select
              value={date.getFullYear()}
              className='font-bold outline-none'
              onChange={({ target: { value } }) => changeYear(+value)}
            >
              {YEARS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className='mr-12 flex gap-12'>
            <button
              type='button'
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
            >
              <IconLess className='h-12 w-12' />
            </button>
            <button
              type='button'
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
            >
              <IconGreater className='h-12 w-12' />
            </button>
          </div>
        </div>
      )}
      showYearDropdown
      scrollableYearDropdown
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
      selected={value}
      onChange={(date: Date) => {
        handleSetDate(dateFormat(date));
        setValue(date);
      }}
      icon={<IconCalendar />}
      onChangeRaw={handleChange}
      required={required}
    />
  );
}

export default DateInput;
