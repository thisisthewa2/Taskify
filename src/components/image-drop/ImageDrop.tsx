import { useSetAtom } from 'jotai';
import { useAtomValue } from 'jotai/index';
import Image from 'next/image';
import useRequest from '@/hooks/useRequest';
import { cardAtom } from '@/store/cardAtom';
import { ImageUrlAtom } from '@/store/imageUrlAtom';
import { IconAddLogo, IconEditLogo } from '@/public/svgs';

interface ImageDropType {
  type: 'modal' | 'profile';
  columnId?: number;
  initialImageUrl?: string;
}

interface BannerImageType {
  [key: string]: 'modal' | 'profile';
}

const DEFINE_IMAGE_PROPERTIES = (columnId?: number) => ({
  path: {
    modal: `columns/${columnId}/card-image`,
    profile: 'users/me/image',
  },
  size: {
    modal: 'h-58 w-58 tablet:h-76 tablet:w-76',
    profile: 'h-100 w-100 tablet:h-190 tablet:w-190',
  },
  dataName: {
    modal: 'imageUrl',
    profile: 'profileImageUrl',
  },
});

function ImageDrop({ type, columnId, initialImageUrl }: ImageDropType) {
  const card = useAtomValue(cardAtom);
  if (!columnId) columnId = card.columnId;
  const IMAGE_PROPERTIES = DEFINE_IMAGE_PROPERTIES(columnId && columnId);
  const imageFormData = new FormData();

  const { data: image, fetch } = useRequest<BannerImageType>({
    skip: true,
    options: {
      url: IMAGE_PROPERTIES.path[type],
      method: 'post',
      data: imageFormData,
    },
  });

  const setImageUrl = useSetAtom(ImageUrlAtom);

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!(e.target.files && e.target.files[0])) return;
    imageFormData.append('image', e.target.files[0]);
    const { data: nextImage } = await fetch();
    if (nextImage) {
      setImageUrl(nextImage);
    }
  };

  return (
    <div className={IMAGE_PROPERTIES.size[type]}>
      <label>
        <input
          className='hidden'
          name='banner'
          type='file'
          onChange={handleChangeImage}
        />
        <figure className={`group relative ${IMAGE_PROPERTIES.size[type]}`}>
          {(image?.[IMAGE_PROPERTIES.dataName[type]] || initialImageUrl) && (
            <div className='absolute-center z-base h-full w-full'>
              <Image
                className='rounded-md group-hover:brightness-75'
                fill
                src={
                  image?.[IMAGE_PROPERTIES.dataName[type]] ??
                  initialImageUrl ??
                  ''
                }
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
