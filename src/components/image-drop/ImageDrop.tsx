import Image from 'next/image';
import useRequest from '@/hooks/useRequest';
import { IconAddLogo, IconEditLogo } from '@/public/svgs';

interface ImageDropType {
  type: 'modal' | 'profile';
  columnId?: number;
}
interface cardLogoImgType {
  [key: string]: 'modal' | 'profile';
}

function ImageDrop({ type, columnId }: ImageDropType) {
  const BOX_ATTRIBUTE = {
    path: {
      modal: `columns/${columnId}/card-image`,
      profile: 'users/me/image',
    },
    size: {
      modal: 'h-76 w-76',
      profile: 'h-100 w-100 tablet:h-190 tablet:w-190',
    },
    dataName: {
      modal: 'imageUrl',
      profile: 'profileImageUrl',
    },
  };

  const imageFormData = new FormData();
  const { data: image, fetch } = useRequest<cardLogoImgType>({
    skip: true,
    options: {
      url: BOX_ATTRIBUTE.path[type],
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
    <div className={BOX_ATTRIBUTE.size[type]}>
      <label>
        <input
          className='hidden'
          name='banner'
          type='file'
          onChange={handleChangeImage}
        />
        <figure className={`group relative ${BOX_ATTRIBUTE.size[type]}`}>
          {image?.[BOX_ATTRIBUTE.dataName[type]] && (
            <div className='absolute-center z-base h-full w-full'>
              <Image
                className='rounded-md group-hover:brightness-75'
                fill
                src={image[BOX_ATTRIBUTE.dataName[type]]}
                alt='BannerImage'
              />
              <IconEditLogo className='absolute-center invisible z-nav group-hover:visible' />
            </div>
          )}
          <figcaption className='relative h-full rounded-md bg-[#f5f5f5]'>
            <IconAddLogo className='absolute-center' />
          </figcaption>
        </figure>
      </label>
    </div>
  );
}

export default ImageDrop;
