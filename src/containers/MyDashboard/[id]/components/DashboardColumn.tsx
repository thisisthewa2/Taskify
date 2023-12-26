import { useEffect, useState } from 'react';
import useRequest from '@/hooks/useRequest';
import { Mock_1_6_Cards } from '@/pages/api/mock';
import Card from '@/components/Card';
import DashBoardColorDot from '@/components/DashBoardColorDot';
import AddChip from '@/components/chips/AddChip';
import NumberChip from '@/components/chips/NumberChip';
import { IconSettings } from '@/public/svgs';

function DashboardColumn({
  title,
  columnId,
}: {
  title: string;
  columnId: string;
}) {
  const { data: cardList, fetch: getCards } = useRequest<any>({
    skip: true,
    options: {
      url: `cards?size=10&columnId=${columnId}`,
      method: 'get',
    },
  });

  useEffect(() => {
    if (!columnId) return;
    getCards();
  }, [columnId]);

  return (
    <div className='flex w-full flex-col border-gray-2 pc:w-354 pc:border-r'>
      <ColumnInfo title={title} totalCount={cardList?.totalCount} />
      <div className='flex flex-col gap-10 border-b border-gray-2 px-12 pb-12 tablet:gap-16 tablet:px-20 tablet:pb-20 pc:border-b-0'>
        <div className='card flex-center py-9'>
          <AddChip />
        </div>
        {cardList &&
          cardList.totalCount !== 0 &&
          cardList.cards.map((card: any, key: number) => {
            return <Card data={card} key={key} />;
          })}
      </div>
    </div>
  );
}

export default DashboardColumn;

function ColumnInfo({
  title,
  totalCount,
}: {
  title: string;
  totalCount: number;
}) {
  return (
    <div className='flex w-full items-center justify-between py-5 pr-12 tablet:py-20 tablet:pl-8 tablet:pr-20'>
      <div className='flex items-center'>
        <DashBoardColorDot color='primary' />
        <p className='subheading-bold pr-12 tablet:pr-20'>{title}</p>
        <NumberChip num={totalCount} />
      </div>
      <IconSettings />
    </div>
  );
}
