import React, { useState } from 'react';
import TagChip from '@/components/chips/TagChip';

function TagInput({
  children,
  tagList = [],
  setTagList = () => {},
  ...rest
}: {
  children: React.ReactNode;
  tagList: string[];
  setTagList: (tagList: string[]) => void;
}) {
  const [tagItem, setTagItem] = useState<string>('');

  const handleTagValue = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (e.key === 'Enter' && target.value.length !== 0) {
      addTagItem();
      return;
    }
    if (e.key === 'Backspace' && tagList?.length !== 0) {
      deleteTagItem(tagList.length - 1);
    }
  };

  const addTagItem = () => {
    if (tagItem.trim() !== '') {
      setTagList([...tagList, tagItem]);
      setTagItem('');
    }
  };

  const deleteTagItem = (index: number) => {
    const filteredTagList = [...tagList];
    filteredTagList.splice(index, 1);
    setTagList(filteredTagList);
  };

  return (
    <div className='input flex h-auto items-center bg-WHITE'>
      <div className='flex w-full flex-wrap  gap-8 '>
        {tagList.map((tag, index) => (
          <div className='flex shrink-0' key={index}>
            <TagChip str={tag}>
              <button
                type='button'
                className='text-8 ml-5 text-gray-5 tablet:h-20 tablet:text-10'
                onClick={() => deleteTagItem(index)}
              >
                x
              </button>
            </TagChip>
          </div>
        ))}
        <input
          className='input-no-style'
          {...rest}
          onKeyUp={handleTagValue}
          onChange={(e) => setTagItem(e.target.value)}
          value={tagItem}
        >
          {children}
        </input>
      </div>
    </div>
  );
}

export default TagInput;
