import ArrowButton from '@/components/buttons/ArrowButton';

interface Props {
  totalCount: number;
  currentPage: number;
  setCurrentPage: (arg: number) => void;
}

function ArrowButtonPageChange({
  totalCount,
  currentPage,
  setCurrentPage,
}: Props) {
  const totalPage = totalCount > 5 ? Math.ceil((totalCount - 5) / 6) + 1 : 1;

  const handleLeftClick = () => setCurrentPage(currentPage - 1);
  const handleRightClick = () => setCurrentPage(currentPage + 1);

  return (
    <div className='flex w-full items-center justify-end gap-15 pt-3 tablet:col-span-2 pc:col-span-3'>
      <p>
        {totalPage} 페이지 중 {currentPage}
      </p>
      <ArrowButton
        onLeftClick={handleLeftClick}
        onRightClick={handleRightClick}
        leftDisabled={currentPage === 1 ? true : false}
        rightDisabled={currentPage === totalPage ? true : false}
      />
    </div>
  );
}

export default ArrowButtonPageChange;
