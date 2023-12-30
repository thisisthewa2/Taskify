import { ReactNode } from 'react';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

interface Props<T extends FieldValues> extends UseControllerProps<T> {
  children: ReactNode;
  placeholder?: string;
}

function InputContainer<T extends FieldValues>({
  children,
  placeholder,
  ...controls
}: Props<T>) {
  const { field, fieldState } = useController(controls);

  return (
    <div>
      <label htmlFor={field.name}>{children}</label>
      <input
        id={field.name}
        placeholder={placeholder}
        {...field}
        className='input mt-10'
      />
      <small className='body2-normal mt-5 text-red'>
        {fieldState?.error?.message}
      </small>
    </div>
  );
}

export default InputContainer;
