import {
  imgs1,
  imgs2,
  imgs3,
} from "../../assets/reportImagesAndIcons/reportCircleImages";

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function randomizeArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

export function createImageThumbnailArray(arrayContainingImage) {
  if (arrayContainingImage.length > 4) {
    const [img1, img2, img3, img4] = arrayContainingImage;
    return [
      { id: 1, img: img1.img },
      { id: 2, img: img2.img },
      { id: 4, img: img3.img },
      { id: 3, img: img4.img },
    ];
  }
  return null;
}
