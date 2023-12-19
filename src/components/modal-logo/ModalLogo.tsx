import axios from 'axios';
import { useState } from 'react';
import { IconAddLogo, IconEditLogo } from '@/public/svgs';

function ModalLogo() {
  const background =
    "bg-[url('/img/hero-pattern.svg')] bg-center bg-cover bg-no-repeat";
  const [logoImg, setLogoImg] = useState(null);

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const imageFormData = new FormData();
    if (e.target.files && e.target.files[0]) {
      imageFormData.append('image', e.target.files[0]);
      axios
        .post(
          'https://sp-taskify-api.vercel.app/3-6/columns/25/card-image',
          imageFormData,
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInRlYW1JZCI6IjMtNiIsImlhdCI6MTcwMjkyMzIzMSwiaXNzIjoic3AtdGFza2lmeSJ9.0TPOJukSsSTg_8C7zltIt_2GXI6Yk3OENf2dj2XtTmY ',
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        .then((res) => {
          console.log(res);
        });
    }
  };
  /*  https://sp-taskify-api.vercel.app/docs/#/Members/Find */
  return (
    <div className='h-76 w-76'>
      <form>
        <label className='relative'>
          <input
            /* className='hidden' */
            name='modalLogo'
            type='file'
            onChange={handleChangeImage}
          />
          <figure>
            {/* <img
            className='absolute-center z-base rounded-md'
            src='https://avatars1.githubusercontent.com/u/11435231?s=460&v=4'
            alt='avatar'
          /> */}
            <figcaption
              className={`relative h-76 rounded-md bg-[#f5f5f5] ${background}`}
            >
              <IconAddLogo className='absolute-center' />
            </figcaption>
          </figure>
        </label>
      </form>
    </div>
  );
}

export default ModalLogo;
