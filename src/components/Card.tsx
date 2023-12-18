import Image from 'next/image';
import { CardProps, Mock_1_6_Cards } from '@/pages/api/mock';
import { IconCalendar } from '@/public/svgs';

//날짜 타입 그냥 내가 맘대로 씀.. 아마 실제로는 함수 써서 바꿔야 될 듯?

function Card() {
  const data: CardProps = Mock_1_6_Cards.cards[0];
  return (
    <div className='card flex flex-col gap-6'>
      {data.imageUrl && <CardImage src={data.imageUrl} />}
      <p className='body1-normal'>{data.title}</p>
      <Tags tags={data.tags} />
      <CardInfo date={data.dueDate} assignee={data.assignee} />
    </div>
  );
}

export default Card;

function CardImage({ src }: { src: string }) {
  return (
    <div className='flex-center relative mb-4 h-152 w-[100%]'>
      <Image
        layout='fill'
        objectFit='cover'
        className='rounded-md'
        src={src}
        alt='카드 이미지'
      />
    </div>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className='flex gap-6'>
      {tags.map((tag, key: number) => {
        //태그 컴포넌트 들어가면 됨. 지금은 내가 임의로 만든거..
        return (
          <div className='flex-center rounded-sm bg-[#E7F7DB] px-6 py-3'>
            <p className='caption-normal text-green'>{tag}</p>
          </div>
        );
      })}
    </div>
  );
}

interface AssigneeInfo {
  profileImageUrl: string;
  nickname: string;
  id: number;
}

interface CardInfoProps {
  date: string;
  assignee: AssigneeInfo;
}

// 색상 기준을 모르겠다...............알파벳에 따라 달라지나? 사용자 이미지 컴포넌트 들어가야 됨.
function CardInfo({ date, assignee }: CardInfoProps) {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-4'>
        <IconCalendar />
        <p className='caption-normal h-13 text-gray-5 tablet:h-15'>{date}</p>
      </div>
      <div className='relative h-22 w-22'>
        <Image
          layout='fill'
          objectFit='cover'
          src={assignee.profileImageUrl}
          className='rounded-full'
          alt='작성자 이미지'
        />
      </div>
    </div>
  );
}
