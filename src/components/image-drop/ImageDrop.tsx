import Image from 'next/image';
import useRequest from '@/hooks/useRequest';
import { IconAddLogo, IconEditLogo } from '@/public/svgs';

interface ImageDropType {
  type: 'modal' | 'profile';
  columnId?: number;
}

interface CardLogoImgType {
  [key: string]: 'modal' | 'profile';
}

const DEFINE_IMAGE_PROPERTIES = (columnId: number | undefined = undefined) => ({
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
});

function ImageDrop({ type, columnId }: ImageDropType) {
  const imageFormData = new FormData();
  const { data: image, fetch } = useRequest<CardLogoImgType>({
    skip: true,
    options: {
      url: DEFINE_IMAGE_PROPERTIES(columnId && columnId).path[type],
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
    <div className={DEFINE_IMAGE_PROPERTIES().size[type]}>
      <label>
        <input
          className='hidden'
          name='banner'
          type='file'
          onChange={handleChangeImage}
        />
        <figure
          className={`group relative ${DEFINE_IMAGE_PROPERTIES().size[type]}`}
        >
          {image?.[DEFINE_IMAGE_PROPERTIES().dataName[type]] && (
            <div className='absolute-center z-base h-full w-full'>
              <Image
                className='rounded-md group-hover:brightness-75'
                fill
                src={image[DEFINE_IMAGE_PROPERTIES().dataName[type]]}
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
