import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useRequest from '@/hooks/useRequest';
import { IconArrowDown, IconCheck } from '@/public/svgs';

interface Member {
  createdAt: string;
  email: string;
  id: string;
  isDone: boolean;
  isOwner: boolean;
  nickname: string;
  profileImageUrl: string;
  updatedAt: string;
  userId: number;
}
function ManagerDropdown() {
  const router = useRouter();
  const { dashboardId } = router.query;

  const { data } = useRequest({
    skip: false,
    options: {
      url: 'members',
      method: 'get',
      params: { dashboardId: dashboardId as string },
    },
  });

  const [managerList, setManagerList] = useState<{ members: Member[] }>({
    members: [],
  });
  const [isDrop, setIsDrop] = useState(false); //border 색과 리스트 활성화 상태
  const [managerName, setManagerName] = useState('');

  useEffect(() => {
    if (!data) return;
    const { members } = data as { members: Member[] };

    const newMembers =
      members.length > 0
        ? members.map((member: Member) => {
            return { ...member, isDone: false };
          })
        : [];

    setManagerList({ members: newMembers });
  }, [data]);

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
    setManagerName(value);
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
      setManagerName(textContent);
    }

    const newManagerList = managerList.members.map((manager) => {
      return manager.userId === id
        ? { ...manager, isDone: true }
        : { ...manager, isDone: false };
    });

    setManagerList({
      ...managerList,
      members: newManagerList,
    });
  };

  const handleBlur = () => {
    console.log(111)
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
      <div className='relative' onBlur={handleBlur} tabIndex={0}>
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
          <label onClick={handleClickBox}>
          <IconArrowDown className='cursor-pointer'  />
          </label>
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
                  key={manager.userId}
                  onClick={(e) => handleClickList(e, manager.userId)}
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
