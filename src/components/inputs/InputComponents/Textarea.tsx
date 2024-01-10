import { useSetAtom } from 'jotai';
import React, { ReactNode, useState } from 'react';
import { CommentAtom } from '@/store/commentAtom';

function Textarea({
  required,
  children,
  ...rest
}: {
  required: boolean;
  children: ReactNode;
}) {
  const setCommentValue = useSetAtom(CommentAtom);
  const [text, setText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setText(value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setCommentValue({ comment: value });
    setText('');
  };

  return (
    <textarea
      className='textarea'
      onChange={handleChange}
      onBlur={handleBlur}
      value={text}
      required={required}
      {...rest}
    >
      {children}
    </textarea>
  );
}

export default Textarea;
