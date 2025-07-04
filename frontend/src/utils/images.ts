import { Image } from 'api/models';

export const getImageSrc = (
  preferredSize: number,
  images?: Image[],
  fallback?: string
) => {
  if (images === undefined || images.length === 0) {
    return fallback ?? '';
  }

  const bestSrc = images.find(
    ({ width, height }) => width === preferredSize || height === preferredSize
  )?.url;

  if (bestSrc) return bestSrc;

  const { smaller, bigger } = images.reduce(
    (acc, image) => {
      if (
        image.height < preferredSize &&
        (acc.smaller === null || acc.smaller.height < image.height)
      ) {
        acc.smaller = image;
      }
      if (
        image.height > preferredSize &&
        (acc.bigger === null || acc.bigger.height > image.height)
      ) {
        acc.bigger = image;
      }

      return acc;
    },
    { smaller: null, bigger: null } as {
      smaller: Image | null;
      bigger: Image | null;
    }
  );

  if (bigger !== null) {
    return bigger.url;
  }
  if (smaller !== null) {
    return smaller.url;
  }

  return fallback ?? '';
};
