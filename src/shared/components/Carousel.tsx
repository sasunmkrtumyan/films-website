"use client";

import {
  useRef,
  useState,
  type PointerEvent,
  type WheelEvent,
  type MouseEvent,
} from "react";
import { cn } from "../../lib/utils";
import type { VideoItem } from "./ui/Button/types.video";

interface CarouselProps {
  videos: VideoItem[];
  onVideoClick: (video: VideoItem) => void;
  className?: string;
}

export function Carousel({ videos, onVideoClick, className }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const displayVideos = videos.slice(0, 8);

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollLeft(trackRef.current.scrollLeft);
    trackRef.current.style.cursor = "grabbing";
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.clientX;
    const walk = (x - startX) * 2;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    if (trackRef.current) {
      trackRef.current.style.cursor = "grab";
    }
  };

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    trackRef.current.scrollLeft += e.deltaY;
  };

  const handleVideoClick = (
    video: VideoItem,
    e: MouseEvent<HTMLDivElement>
  ) => {
    if (isDragging) {
      e.preventDefault();
      return;
    }
    onVideoClick(video);
  };

  return (
    <div className={cn("absolute bottom-0 left-0 right-0 p-6", className)}>
      <h2 className="text-[color:var(--text-white)] text-2xl font-bold mb-6 ml-24">
        Trending Now
      </h2>

      <div
        ref={viewportRef}
        className="overflow-hidden ml-24"
        onWheel={handleWheel}
      >
        <div
          ref={trackRef}
          className="flex gap-3 cursor-grab select-none overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {displayVideos.map((video) => (
            <div
              key={video.Id}
              className="flex-shrink-0 w-[calc((100vw-12rem)/8-0.75rem)] min-w-[180px] max-w-[220px] group cursor-pointer transition-transform duration-200"
              onClick={(e) => handleVideoClick(video, e)}
            >
              <div className="relative">
                <img
                  src={`/src/assets/images/png/${video.CoverImage}`}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `/placeholder.svg?height=330&width=220&query=${encodeURIComponent(
                      video.Title
                    )}`;
                  }}
                  alt={video.Title}
                  className="w-full h-[250px] object-cover transition-transform duration-300"
                  loading="lazy"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />

                {/* Hover overlay with title */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <h3 className="text-[color:var(--text-white)] font-semibold text-sm line-clamp-2">
                    {video.Title}
                  </h3>
                  <p className="text-[color:var(--text-secondary)] text-xs mt-1">
                    {video.ReleaseYear} • {video.MpaRating}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
