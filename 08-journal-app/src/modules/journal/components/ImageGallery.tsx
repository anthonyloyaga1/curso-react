import { Delete } from '@mui/icons-material';
import { IconButton, ImageList, ImageListItem } from '@mui/material';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../common/hooks/useRedux';
import { startDeletingImage } from '../../../common/store/journal/journalThunks';
import Swal from 'sweetalert2';

interface ImageGalleryProps {
  images: string[];
}

export const ImageGallery = ({ images }: ImageGalleryProps) => {
  const {
    loading,
    data: { messageDeleted },
  } = useAppSelector((state) => state.journal);
  const dispatch = useAppDispatch();

  const handleDeleteImage = (url: string) => {
    dispatch(startDeletingImage(url));
  };

  useEffect(() => {    
    if (messageDeleted !== '') Swal.fire('Eliminado', messageDeleted, 'success');
  }, [messageDeleted]);

  const onMouseEnter = (e: React.MouseEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.style.filter = 'brightness(1.2)';
    target.style.transition = 'filter 0.2s ease-in-out';
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.style.filter = 'brightness(0.8)';
    target.style.transition = 'filter 0.2s ease-in-out';
  };

  return (
    <ImageList sx={{ width: '100%', height: 450 }} cols={3} rowHeight={200}>
      {images.map((url) => (
        <ImageListItem key={url} component="div" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <img
            srcSet={`${url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${url}?w=164&h=164&fit=crop&auto=format`}
            alt={'image'}
            loading="lazy"
          />

          <IconButton
            disabled={loading}
            size="small"
            aria-label="delete"
            onClick={() => handleDeleteImage(url)}
            sx={{ position: 'absolute', top: 8, right: 8, backgroundColor: 'HighlightText', opacity: 0.6 }}
          >
            <Delete />
          </IconButton>
        </ImageListItem>
      ))}
    </ImageList>
  );
};
