export interface GalleryPhoto {
  src: string;
  alt: string;
  location: string;
  date: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  photos: GalleryPhoto[];
}

export const localAlbums: GalleryAlbum[] = [];
