import Image from 'next/image';
import Link from 'next/link';
import { JSXElementConstructor, ReactElement } from 'react';
import { generateColor } from '@/utils/generateColor';
import { CardProps } from '@/pages/api/mock';
import Close from '@/components/icons/Close';
import Kebab from '@/components/icons/Kebab';
import { IconCalendar } from '@/public/svgs';
import { DEFAULT_PROFILE_COLOR } from './Members';
import { Button } from './buttons';
import TagChip from './chips/TagChip';
import Input from './inputs/Input';
import Form from './modal/Form';
import Modal from './modal/Modal';

function Card({ data, title }: { data: CardProps; title: string }) {
  if (!data) return;
  return (
    <ViewDetail cardData={data} title={title}>
      <div className='card flex cursor-pointer flex-col gap-6 tablet:flex-row pc:w-314 pc:flex-col pc:gap-10'>
        {data.imageUrl && <CardImage src={data.imageUrl} />}
        <div className='flex w-full flex-col gap-6 pc:gap-10'>
          <p className='body1-normal'>{data.title}</p>
          <div className='flex flex-col gap-6 tablet:flex-row tablet:gap-16 pc:flex-col pc:gap-10'>
            <Tags tags={data.tags} />
            <CardInfo date={data.dueDate} assignee={data.assignee} />
          </div>
        </div>
      </div>
    </ViewDetail>
  );
}

export default Card;

function CardImage({ src }: { src: string }) {
  return (
    <div className='flex-center relative mb-4 h-152 w-full tablet:h-53 tablet:w-91 pc:h-160 pc:w-274'>
      <Image
        fill
        className='rounded-md object-cover'
        sizes='100%'
        src={src}
        alt='카드 이미지'
        priority={true}
      />
    </div>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className='flex shrink-0 items-center gap-6'>
      {tags.map((tag, key: number) => {
        return <TagChip key={key} str={tag} />;
      })}
    </div>
  );
}

interface AssigneeInfo {
  profileImageUrl?: string;
  nickname: string;
  id: number;
}

interface CardInfoProps {
  date: string;
  assignee: AssigneeInfo;
}

function CardInfo({ date, assignee }: CardInfoProps) {
  const profile = {
    id: assignee.id,
    profileImageUrl: assignee.profileImageUrl || undefined,
    nickname: assignee.nickname,
  };

  return (
    <div className='flex w-full items-center justify-between'>
      <div className='flex items-center gap-4'>
        <IconCalendar />
        <p className='caption-normal h-13 text-gray-5 tablet:h-15'>{date}</p>
      </div>
      <div className='h-22 w-22 tablet:h-24 tablet:w-24'>
        <Member member={profile} />
      </div>
    </div>
  );
}

function Member({ member }: { member: AssigneeInfo }) {
  return (
    <div className='flex-center relative h-22 tablet:h-24'>
      {member.profileImageUrl ? (
        <ImageMember profileImageUrl={member.profileImageUrl} />
      ) : (
        <DefaultMember key={member.id} nickname={member.nickname} />
      )}
    </div>
  );
}

interface ImageMember {
  profileImageUrl: string;
}

function ImageMember({ profileImageUrl }: ImageMember) {
  return (
    <div className='border-solid-white flex-center absolute h-22 w-22 overflow-hidden rounded-full tablet:h-24 tablet:w-24'>
      <Image
        src={profileImageUrl}
        fill
        style={{
          objectFit: 'cover',
        }}
        alt='멤버 프로필 이미지'
      />
    </div>
  );
}

interface DefaultMember {
  nickname: string;
}

function DefaultMember({ nickname }: DefaultMember) {
  const initial = nickname[0].toUpperCase();
  const color = DEFAULT_PROFILE_COLOR[generateColor(initial)];

  return (
    <div
      className={`border-solid-white caption-bold ${color} flex-center absolute h-22 w-22 rounded-full text-white tablet:h-24 tablet:w-24`}
    >
      {initial}
    </div>
  );
}

interface ViewDetailType {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  cardData: CardProps;
  title: string;
}

function ViewDetail({ children, cardData, title }: ViewDetailType) {
  return (
    <Modal>
      <>
        <Modal.Open opens='card'>{children}</Modal.Open>
        <Modal.Window name='card'>
          <Form>
            <Form.CardViewDetail cardData={cardData} title={title} />
          </Form>
        </Modal.Window>
      </>
    </Modal>
  );
}
