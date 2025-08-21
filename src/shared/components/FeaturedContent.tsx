"use client";

import { useState, useEffect, type FC } from "react";
import type { VideoItem } from "./ui/Button/types.video";
import { Button } from "./ui/Button";

interface FeaturedContentProps {
  video: VideoItem;
  className?: string;
}

export const FeaturedContent: FC<FeaturedContentProps> = ({
  video,
  className = "",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  console.log("isPlaying: ", isPlaying);
  console.log(video);
  const [showVideo, setShowVideo] = useState(false);

  const {
    Category,
    CoverImage,
    // Date,
    Description,
    Duration,
    Id,
    MpaRating,
    ReleaseYear,
    Title,
    // TitleImage,
    // isFeatured,
    // isTrending,
    // thumbnail,
    VideoUrl,
  } = video;
  console.log("VideoUrl: ", VideoUrl);

  useEffect(() => {
    // Reset video state when video changes
    setIsPlaying(false);
    setShowVideo(false);

    // Start video after 2 seconds
    const timer = setTimeout(() => {
      setShowVideo(true);
      setIsPlaying(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [Id]);

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className={`w-full h-screen ${className}`}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(src/assets/images/png/${CoverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Background Video Overlay */}
      {showVideo && (
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          controls={false}
          src={VideoUrl}
        />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute pb-54 inset-0 flex items-center">
        <div className="max-w-2xl ml-24 space-y-6">
          {/* Category */}
          <div className="text-[color:var(--text-secondary)] text-sm font-medium tracking-wider uppercase">
            {Category}
          </div>

          {/* Title */}
          <h1 className="text-6xl font-bold text-[color:var(--text-white)] leading-tight">
            {Title}
          </h1>

          {/* Metadata */}
          <div className="flex items-center text-xl gap-4 text-[color:var(--text-white)]">
            <span className="text-[color:var(--text-white)] text-xl font-semibold">
              {ReleaseYear}
            </span>
            <span className="px-2 py-1 rounded font-medium">{MpaRating}</span>
            <span>{formatDuration(Duration)}</span>
          </div>

          {/* Description */}
          <p className="text-[color:var(--text-white)] text-lg leading-relaxed max-w-xl">
            {Description}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-[color:var(--primary-button-main)] hover:bg-[color:var(--primary-button-hover)] text-[color:var(--text-dark)] font-semibold px-8 py-3 rounded-md transition-colors"
            >
              Play
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-[color:var(--hover)]/60 hover:bg-[color:var(--hover)]/80 border-[color:var(--text-secondary)]/30 text-[color:var(--text-white)] font-semibold px-8 py-3 rounded-md transition-colors"
            >
              More Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
