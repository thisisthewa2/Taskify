import { useAtom, useSetAtom } from 'jotai';
import React, { ReactNode } from 'react';
import { CommentAtom } from '@/store/commentAtom';

function Textarea({
  required,
  children,
  ...rest
}: {
  required: boolean;
  children: ReactNode;
}) {
  const [commentValue, setCommentValue] = useAtom(CommentAtom);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setCommentValue({ comment: value });
  };

  return (
    <textarea
      className='textarea'
      onChange={handleChange}
      value={commentValue.comment}
      required={required}
      {...rest}
    >
      {children}
    </textarea>
  );
}

export default Textarea;
