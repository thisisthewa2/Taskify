import { Button } from '@/components/buttons';

function Home() {
  return (
    <div className='flex flex-col gap-20 p-50'>
      <Button size='sm'>sm 버튼</Button>
      <Button size='md'>md 버튼</Button>
      <Button size='lg'>lg 버튼</Button>
      <Button size='full'>full 버튼</Button>
      <Button size='full' disabled>
        disabled 버튼
      </Button>
      <Button.Secondary size='sm'>sm 버튼</Button.Secondary>
      <Button.Secondary size='md'>md 버튼</Button.Secondary>
      <Button.Secondary size='lg'>lg 버튼</Button.Secondary>
      <Button.Secondary size='full'>full 버튼</Button.Secondary>
      <Button.Secondary size='full' disabled>
        disabled 버튼
      </Button.Secondary>
      <Button.Arrow leftDisabled />
    </div>
  );
}

export default Home;
