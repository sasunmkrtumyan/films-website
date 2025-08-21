// Image import helper for dynamic image loading
export const getImageUrl = (imagePath: string): string => {
  try {
    // For Vite, we need to use dynamic imports for images in src/assets
    return new URL(`../assets/images/png/${imagePath}`, import.meta.url).href;
  } catch (error) {
    console.warn(`Failed to load image: ${imagePath}`, error);
    // Fallback to a placeholder or default image
    return '/placeholder.svg';
  }
};

// Helper for icon images
export const getIconUrl = (iconName: string): string => {
  try {
    return new URL(`../assets/images/icons/${iconName}.png`, import.meta.url).href;
  } catch (error) {
    console.warn(`Failed to load icon: ${iconName}`, error);
    return '/placeholder.svg';
  }
};

// Pre-import commonly used images
export { default as FeaturedTitleImage } from '@assets/images/png/FeaturedTitleImage.png';
export { default as FeaturedCoverImage } from '@assets/images/png/FeaturedCoverImage.png';

// Pre-import icons
export { default as SearchIcon } from '@assets/images/icons/search.png';
export { default as HomeIcon } from '@assets/images/icons/home.png';
export { default as TvIcon } from '@assets/images/icons/tv.png';
export { default as MoviesIcon } from '@assets/images/icons/movies.png';
export { default as GenresIcon } from '@assets/images/icons/genres.png';
export { default as LeterIcon } from '@assets/images/icons/leter.png';
