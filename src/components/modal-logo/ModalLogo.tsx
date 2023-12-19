import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { IconAddLogo, IconEditLogo } from '@/public/svgs';

function ModalLogo() {
  const [cardLogoImg, setCardLogoImg] = useState({ imageUrl: '' });

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFormData = new FormData();
    if (e.target.files && e.target.files[0]) {
      imageFormData.append('image', e.target.files[0]);
      axios
        .post(
          'https://sp-taskify-api.vercel.app/1-6/columns/47/card-image', //나중에 export된 변수로 변경
          imageFormData,
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsInRlYW1JZCI6IjEtNiIsImlhdCI6MTcwMjk2MzQ1OSwiaXNzIjoic3AtdGFza2lmeSJ9.TD0YgCYyaldT0f581DNyyrvrlb1WRvTgPTj_iG9FUHQ',
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        .then((res) => {
          setCardLogoImg({
            ...cardLogoImg,
            imageUrl: res.data.imageUrl,
          });
        });
    }
  };
  return (
    <div className='w-76'>
      <label>
        <input
          className='hidden'
          name='modalLogo'
          type='file'
          onChange={handleChangeImage}
        />
        <figure className='group relative'>
          {cardLogoImg.imageUrl && (
            <>
              <Image
                className='absolute-center z-base h-76 w-76 rounded-md group-hover:brightness-75'
                width={76}
                height={76}
                src={cardLogoImg.imageUrl}
                alt='cardBannerImage'
              />
              <IconEditLogo className='absolute-center invisible z-nav group-hover:visible ' />
            </>
          )}
          <figcaption className={`relative h-76 rounded-md bg-[#f5f5f5]`}>
            <IconAddLogo className='absolute-center' />
          </figcaption>
        </figure>
      </label>
    </div>
  );
}

export default ModalLogo;
