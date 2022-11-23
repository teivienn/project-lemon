import { useDropzone } from 'react-dropzone';
import Resizer from 'react-image-file-resizer';

interface UseSelectImage {
  // base64
  onSuccess: (image: string) => void;
  maxWidth?: number;
  maxHeight?: number;
}

export const useSelectImage = ({
  onSuccess,
  maxHeight = 300,
  maxWidth = 300,
}: UseSelectImage) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    onDrop: (files) => {
      const file = files?.[0];

      if (file) {
        Resizer.imageFileResizer(file, maxWidth, maxHeight, 'JPEG', 80, 0, (image) => {
          onSuccess(image as unknown as string);
        });
      }
    },
  });

  return {
    getRootProps,
    getInputProps,
  };
};
