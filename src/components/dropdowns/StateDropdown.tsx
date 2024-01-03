import { useState } from 'react';
import { IconArrowDown, IconCheck } from '@/public/svgs';

const columns = {
  data: [
    { id: 1, dashboardId: 13, title: 'TODO' },
    { id: 2, dashboardId: 13, title: 'on Progress' },
    { id: 3, dashboardId: 13, title: 'Done' },
  ],
};

function StateDropdown() {
  /* 받은 데이터에 isDone 추가하는 함수입니다(이름 클릭하면 체크 표시되게 끔) */
  const newColumns = columns.data.map((column, index) => {
    if (index === 0) {
      return { ...column, isDone: true };
    }
    return { ...column, isDone: false };
  });

  const [todoList, setTodoList] = useState({ data: newColumns });
  const [isDrop, setIsDrip] = useState(false);
  const [todoName, setTodoName] = useState(todoList.data[0].title);

  const handleClickBox = () => {
    setIsDrip(!isDrop);
  };

  const handleClickList = (e: React.MouseEvent<HTMLLIElement>, id: number) => {
    setIsDrip(!isDrop);

    const { textContent } = e.currentTarget;
    if (textContent) {
      setTodoName(textContent);
    }

    const newTodoList = todoList.data.map((todo) => {
      return todo.id === id
        ? { ...todo, isDone: true }
        : { ...todo, isDone: false };
    });

    setTodoList({
      ...todoList,
      data: newTodoList,
    });
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsDrip(false);
    }, 200);
  };

  return (
    <div className='flex w-287 flex-col justify-start gap-10 tablet:w-217'>
      <h2 className='subheading-normal'>상태</h2>
      <div className='relative' onBlur={handleBlur} tabIndex={0}>
        <div
          className={` flex h-48 w-full items-center justify-between rounded-md p-16 ${
            isDrop ? 'border-solid-primary' : 'border-solid-gray'
          } cursor-pointer`}
          onClick={handleClickBox}
        >
          <span>{todoName}</span>
          <IconArrowDown />
        </div>
        <ul
          className={`border-solid-gray absolute left-0 ${
            isDrop ? 'top-50' : 'top-46 z-[-1] opacity-0'
          } flex w-full flex-col items-start justify-between gap-13 rounded-md bg-white p-8 transition-all duration-100`}
        >
          {todoList.data.map((todo) => {
            return (
              <li
                className='body1-normal flex w-full cursor-pointer items-start justify-start gap-6 rounded-sm hover:bg-gray-2'
                key={todo.id}
                onClick={(e) => handleClickList(e, todo.id)}
              >
                {todo.isDone ? (
                  <IconCheck fill='black' />
                ) : (
                  <div className='w-22'></div>
                )}
                {todo.title}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default StateDropdown;
