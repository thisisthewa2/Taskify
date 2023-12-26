import { useState } from 'react';
import { IconArrowDown, IconCheck } from '@/public/svgs';

/* 데이터를 내려받게되면 이부분 지워도됩니다 */
const manager = {
  members: [
    { userid: 1, email: 'test@naver.com', profile: null, nickname: '배유철' },
    { userid: 2, email: 'test@naver.com', profile: null, nickname: '배동석' },
    { userid: 3, email: 'test@naver.com', profile: null, nickname: '안윤진' },
    { userid: 4, email: 'test@naver.com', profile: null, nickname: '김다은' },
    { userid: 5, email: 'test@naver.com', profile: null, nickname: '임건우' },
    { userid: 6, email: 'test@naver.com', profile: null, nickname: '강현지' },
    { userid: 7, email: 'test@naver.com', profile: null, nickname: '남민섭' },
  ],
};

function ManagerDropdown() {
  /* 받은 데이터에 isDone 추가하는 함수입니다(이름 클릭하면 체크 표시되게 끔) */
  const newMembers = manager.members.map((member) => {
    return { ...member, isDone: false };
  });
  const [managerList, setManagerList] = useState({ members: newMembers });
  const [isDrop, setIsDrop] = useState(false); //border 색과 리스트 활성화 상태
  const [managerName, setmanagerName] = useState('');

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
  const searChManagerList = managerList.members.filter((manager) => {
    if (managerName.length > 0) {
      return manager.nickname.includes(managerName);
    } else {
      return managerList.members;
    }
  });

  const handleClickList = (e: React.MouseEvent<HTMLLIElement>, id: number) => {
    setIsDrop(!isDrop);

    const { textContent } = e.currentTarget;
    if (textContent) {
      setmanagerName(textContent);
    }

    const newManagerList = managerList.members.map((manager) => {
      return manager.userid === id
        ? { ...manager, isDone: true }
        : { ...manager, isDone: false };
    });

    setManagerList({
      ...managerList,
      members: newManagerList,
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
          } w-full flex-col items-start justify-start gap-13 overflow-auto rounded-md bg-white p-8 transition-all duration-500`}
        >
          {searChManagerList.length > 0 ? (
            searChManagerList.map((manager) => {
              return (
                <li
                  className='body1-normal flex w-full cursor-pointer items-start justify-start gap-6 rounded-sm hover:bg-gray-2'
                  key={manager.userid}
                  onClick={(e) => handleClickList(e, manager.userid)}
                >
                  {manager.isDone ? (
                    <IconCheck fill='black' />
                  ) : (
                    <div className='w-22'></div>
                  )}
                  {manager.nickname}
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
