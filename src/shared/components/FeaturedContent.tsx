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
  const [showVideo, setShowVideo] = useState(false);

  const {
    Category,
    CoverImage,
    Description,
    Duration,
    Id,
    MpaRating,
    ReleaseYear,
    Title,
    VideoUrl,
  } = video;

  useEffect(() => {
    console.log("Video data:", { Id, VideoUrl, Title }); // Debug log

    // Reset video state when video changes
    setShowVideo(false);

    // Start video after 2 seconds
    const timer = setTimeout(() => {
      console.log("Attempting to show video:", VideoUrl); // Debug log
      setShowVideo(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [Id, VideoUrl]);

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div
      className={`relative w-full h-screen bg-black max-h-[500px] ${className}`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 max-h-[550px] bg-center-right bg-no-repeat"
        style={{
          backgroundImage: `url(/src/assets/images/png/${CoverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
        }}
      />

      {/* Background Video Overlay */}
      {showVideo && VideoUrl && (
        <>
          <div className="absolute inset-0 w-full h-full">
            <iframe
              src={`${VideoUrl}?autoplay=1&mute=1`}
              className="w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
              title={Title}
            />
          </div>
        </>
      )}

      {/* Gradient Overlay */}
      <div
        className="absolute w-full inset-0 bg-gradient-to-r from-black/100 via-black/80 to-transparent"
        style={{ zIndex: 2 }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex items-center" style={{ zIndex: 3 }}>
        <div className="max-w-2xl ml-24 space-y-4">
          {/* Category */}
          <div className="text-[#858688] text-base font-medium tracking-wider uppercase">
            {Category}
          </div>

          {/* Title */}
          {Title === "The Irishman" ? (
            <img
              src="/src/assets/images/png/FeaturedTitleImage.png"
              alt={Title}
              className="w-full h-auto max-w-2xl"
            />
          ) : (
            <h1 className="text-6xl font-bold text-[color:var(--text-white)] leading-tight">
              {Title}
            </h1>
          )}

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
              className="!bg-white hover:bg-gray-100 !text-black !text-lg font-semibold !px-10 !py-5 !rounded-full transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5 fill-black" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="!bg-[#2024DE] !text-lg !hover:bg-[#2024DE] border-gray-500/50 text-white hover:!text-white font-semibold !px-10 !py-5 !rounded-full transition-colors"
            >
              More Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
