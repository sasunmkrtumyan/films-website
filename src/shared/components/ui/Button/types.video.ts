export interface VideoItem {
  Id: string;
  Title: string;
  Description: string;
  Category: string;
  ReleaseYear: number;
  Duration: number;
  MpaRating: string;
  CoverImage: string;
  TitleImage?: string;
  thumbnail?: string;
  VideoUrl: string;
  Date?: string;
  isFeatured?: boolean;
  isTrending?: boolean;
}
