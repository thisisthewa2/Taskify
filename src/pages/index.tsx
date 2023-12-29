import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import useRequest from '@/hooks/useRequest';
import { loginAtom } from '@/store/loginAtom';
import { setAccessToken } from '@/services/utils/handleToken';
import SideMenu from '@/components/SideMenu';
import { Button } from '@/components/buttons';
import Close from '@/components/icons/Close';
import Kebab from '@/components/icons/Kebab';
import Input from '@/components/inputs/Input';
import Confirm from '@/components/modal/Confirm';
import Form from '@/components/modal/Form';
import Modal from '@/components/modal/Modal';

function Home() {
  const [loginInfo, setLoginInfo] = useAtom(loginAtom);

  const { data: myInfo } = useRequest({
    options: {
      url: 'users/me',
      method: 'get',
    },
  });

  const { data, fetch }: any = useRequest({
    skip: true,
    options: {
      url: 'dashboards',
      method: 'post',
      data: {
        title: '테스트',
        color: '#7AC555',
      },
    },
  });

  const handleClick = async () => {
    console.log(myInfo);
    await fetch();
    console.log(data);
  };

  return (
    <>
      <button onClick={handleClick}>click</button>
      <Modal>
        <CardButton />
      </Modal>
    </>
  );
}

export default Home;

function CardButton() {
  return (
    <Modal>
      <>
        <Modal.Open opens='card'>
          <button type='button' className='flex-center py-9'>
            카드모달
          </button>
        </Modal.Open>
        <Modal.Window name='card'>
          <Form>
            <div className='flex items-center justify-between'>
              <h2 className='heading1-bold text-gray-7'>
                새로운 일정 관리 Taskify
              </h2>
              <div className='flex items-center justify-between gap-24'>
                <Kebab />
                <Close />
              </div>
            </div>
            <div className='flex items-start justify-between gap-24'>
              <div>
                <div className='mt-24 flex items-center justify-start'>
                  <div className='border-r border-gray-3 pr-20'>컬럼</div>
                  <ul className='flex items-center justify-start gap-6 pl-20'>
                    <li>프로젝트</li>
                    <li>코딩</li>
                  </ul>
                </div>
                <p className='body2-normal my-16 text-gray-7'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum finibus nibh arcu, quis consequat ante cursus eget.
                  Cras mattis, nulla non laoreet porttitor, diam justo laoreet
                  eros, vel aliquet diam elit at leo.
                </p>
                <Image
                  width={450}
                  height={263}
                  src='/pngs/desk-pc.png'
                  alt='이미지'
                />
                <div className='relative mb-20 mt-24'>
                  <Input
                    type='textarea'
                    title='댓글'
                    required={false}
                    placeholder='댓글 작성하기'
                  />
                  <div className='absolute bottom-12 right-12'>
                    <Button.Secondary size='md'>입력</Button.Secondary>
                  </div>
                </div>
                <div className='flex items-start justify-start gap-10'>
                  <div className='flex-center h-34 w-34 rounded-full bg-[yellow]'>
                    C
                  </div>
                  <div className='flex flex-col items-start justify-start pt-8'>
                    <div className='flex items-center justify-start gap-8'>
                      <h3 className='body2-bold text-gray-7'>장만철</h3>
                      <small className='caption-normal text-gray-4'>
                        2022.12.27 14:00
                      </small>
                    </div>
                    <p className='body2-normal mb-12 mt-6 text-gray-7'>
                      오늘안에 CCC 까지 망들 수 있을까요?
                    </p>
                    <div className='caption-normal flex items-center justify-start gap-12   text-gray-4 underline'>
                      <Link href={'#none'}>수정</Link>
                      <Link href={'#none'}>삭제</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className='card mt-21 w-200 flex-shrink-0'>
                <h3 className='caption-bold mb-6 text-gray-7'>담당자</h3>
                <div className='body2-normal flex items-center justify-start gap-8'>
                  <div className='flex-center h-34 w-34 rounded-full bg-[green]'>
                    C
                  </div>
                  <h2>배철수</h2>
                </div>
                <h3 className='caption-bold mb-6 mt-20 text-gray-7'>마감일</h3>
                <div className='caption-bold text-gray-7'>2022.12.30 19:00</div>
              </div>
            </div>
          </Form>
        </Modal.Window>
      </>
    </Modal>
  );
}
