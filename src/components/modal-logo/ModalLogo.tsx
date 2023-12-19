import Image from 'next/image';
import useRequest from '@/hooks/useRequest';
import { IconAddLogo, IconEditLogo } from '@/public/svgs';

interface cardLogoImgType {
  imageUrl: string;
}

function ModalLogo() {
  const imageFormData = new FormData();
  const { data: image, fetch } = useRequest<cardLogoImgType>({
    skip: true,
    options: {
      url: 'columns/47/card-image',
      method: 'post',
      data: imageFormData,
    },
  });

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      imageFormData.append('image', e.target.files[0]);
      fetch();
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
          {image?.imageUrl && (
            <>
              <Image
                className='absolute-center z-base h-76 w-76 rounded-md group-hover:brightness-75'
                width={76}
                height={76}
                src={image.imageUrl}
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
