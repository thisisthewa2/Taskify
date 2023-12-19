import Members from '@/components/Members';

const data1 = [
  {
    id: 1,
    profileImageUrl:
      'https://mblogthumb-phinf.pstatic.net/MjAxOTA3MTZfOTcg/MDAxNTYzMjU4OTgxNTgz.n6PR-FWCx97rgc0vjDTBJU_O1SdzuP2wU_0ja-AdtTIg.3tVQKL6R45VsZR1nDNfcjh_EvLt6XHWwopG5rcAfq68g.JPEG.dono_box/%EA%B3%A8%EB%93%A0%EB%A6%AC%ED%8A%B8%EB%A6%AC%EB%B2%8411.jpg?type=w800',
    nickname: '가',
  },
  { id: 2, profileImageUrl: undefined, nickname: '다' },
  { id: 3, profileImageUrl: undefined, nickname: '바' },
  { id: 4, profileImageUrl: undefined, nickname: '아' },
  { id: 5, profileImageUrl: undefined, nickname: '하' },
  { id: 6, profileImageUrl: undefined, nickname: '하' },
  { id: 7, profileImageUrl: undefined, nickname: '하' },
  { id: 8, profileImageUrl: undefined, nickname: '하' },
  { id: 9, profileImageUrl: undefined, nickname: '하' },
];

const data2 = [
  { id: 1, profileImageUrl: undefined, nickname: 'A' },
  { id: 2, profileImageUrl: undefined, nickname: 'F' },
  { id: 3, profileImageUrl: undefined, nickname: 'K' },
  { id: 4, profileImageUrl: undefined, nickname: 'Q' },
  { id: 5, profileImageUrl: undefined, nickname: 'V' },
  { id: 5, profileImageUrl: undefined, nickname: 'V' },
];

const data3 = [{ id: 1, profileImageUrl: undefined, nickname: 'a' }];

const data4 = [
  { id: 1, profileImageUrl: undefined, nickname: 'a' },
  { id: 2, profileImageUrl: undefined, nickname: 'f' },
];

const data5 = [
  { id: 1, profileImageUrl: undefined, nickname: 'a' },
  { id: 2, profileImageUrl: undefined, nickname: 'f' },
  { id: 3, profileImageUrl: undefined, nickname: 'f' },
];

const data6 = [
  { id: 1, profileImageUrl: undefined, nickname: 'a' },
  { id: 2, profileImageUrl: undefined, nickname: 'f' },
  { id: 3, profileImageUrl: undefined, nickname: 'f' },
  { id: 4, profileImageUrl: undefined, nickname: 'f' },
];

const data7 = [
  { id: 1, profileImageUrl: undefined, nickname: 'a' },
  { id: 2, profileImageUrl: undefined, nickname: 'f' },
  { id: 3, profileImageUrl: undefined, nickname: 'f' },
  { id: 4, profileImageUrl: undefined, nickname: 'f' },
  { id: 5, profileImageUrl: undefined, nickname: 'f' },
];

function Home() {
  return (
    <div className='flex w-100 flex-col gap-20 p-30'>
      <Members members={data1} />
      <Members members={data2} />
      <Members members={data3} />
      <Members members={data4} />
      <Members members={data5} />
      <Members members={data6} />
      <Members members={data7} />
    </div>
  );
}

export default Home;
