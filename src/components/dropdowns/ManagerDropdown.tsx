import { useState } from 'react';
import { IconArrowDown, IconCheck } from '@/public/svgs';

function ManagerDropdown() {
  /* 컴포넌트 합칠 때 수정해도됩니다.*/
  const [managerList, setManagerList] = useState({
    managerState: [
      { id: 1, manager: '배유철', isDone: true },
      { id: 2, manager: '배동석', isDone: false },
      { id: 3, manager: '안윤진', isDone: false },
      { id: 4, manager: '김다은', isDone: false },
      { id: 5, manager: '임건우', isDone: false },
      { id: 6, manager: '강현지', isDone: false },
      { id: 7, manager: '남민섭', isDone: false },
    ],
  });
  const [isDrop, setIsDrop] = useState(false); //border 색과 리스트 활성화 상태
  const [managerName, setmanagerName] = useState(
    managerList.managerState[0].manager,
  );
  /* 화면에 보이는 박스 클릭했을 때 활성화 */
  const handleClickBox = () => {
    setIsDrop(!isDrop);
  };

  /* input 클릭했을 때 활성화*/
  const handleFocusBox = () => {
    setIsDrop(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setIsDrop(true);
    setmanagerName(value);
  };

  /* 검색리스트 생성 */
  const searChManagerList = managerList.managerState.filter((manager) => {
    if (managerName.length > 0) {
      return manager.manager.includes(managerName);
    } else {
      return managerList.managerState;
    }
  });

  const handleClickList = (e: React.MouseEvent<HTMLLIElement>, id: number) => {
    setIsDrop(!isDrop);

    const { textContent } = e.currentTarget;
    if (textContent) {
      setmanagerName(textContent);
    }

    const newManagerList = managerList.managerState.map((manager) => {
      return manager.id === id
        ? { ...manager, isDone: true }
        : { ...manager, isDone: false };
    });

    setManagerList({
      ...managerList,
      managerState: newManagerList,
    });
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsDrop(false);
    }, 200);
  };

  /* 리스트 길이가 길어지면 스크롤바 활성화, 짧을 땐 빈 여백 제거*/
  const isListLengthCheck = () => {
    return searChManagerList.length > 3;
  };

  return (
    <div className='flex w-287 flex-col justify-start gap-10 tablet:w-217 '>
      <h2 className='subheading-normal'>담당자</h2>
      <div className='relative' onBlur={handleBlur}>
        <div
          className={`flex h-48 w-full items-center justify-between rounded-md p-16 ${
            isDrop ? 'border-solid-primary' : 'border-solid-gray'
          }`}
        >
          <input
            className=' body1-normal w-full outline-none'
            type='text'
            name='manager'
            placeholder='이름을 입력해주세요'
            value={managerName}
            onChange={handleChange}
            onFocus={handleFocusBox}
          />
          <IconArrowDown className='cursor-pointer' onClick={handleClickBox} />
        </div>
        <ul
          className={`border-solid-gray absolute left-0 ${
            isDrop ? 'top-50' : 'top-46 z-[-1] opacity-0'
          } flex  ${
            isListLengthCheck() ? 'h-118' : null
          } w-full flex-col items-start justify-start gap-13 overflow-auto rounded-md p-8 transition-all duration-500`}
        >
          {searChManagerList.length > 0 ? (
            searChManagerList.map((manager) => {
              return (
                <li
                  className='body1-normal flex w-full cursor-pointer items-start justify-start gap-6 rounded-sm hover:bg-gray-2'
                  key={manager.id}
                  onClick={(e) => handleClickList(e, manager.id)}
                >
                  {manager.isDone ? (
                    <IconCheck />
                  ) : (
                    <div className='w-22'></div>
                  )}
                  {manager.manager}
                </li>
              );
            })
          ) : (
            <li>해당 유저가 없습니다.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ManagerDropdown;
