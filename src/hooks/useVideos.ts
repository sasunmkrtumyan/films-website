"use client";

import type { VideoItem } from "@components/ui/Button/types.video";
import { useState, useEffect } from "react";

const readSessionArray = (key: string): string[] => {
  if (typeof window === "undefined") return [];

  try {
    const stored = sessionStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const pushUniqueFront = (key: string, value: string): void => {
  if (typeof window === "undefined") return;

  try {
    const current = readSessionArray(key);
    const filtered = current.filter((item) => item !== value);
    const updated = [value, ...filtered].slice(0, 10); // Keep only last 10 items

    sessionStorage.setItem(key, JSON.stringify(updated));
  } catch {
    // Silently fail if sessionStorage is not available
  }
};

interface VideosResponse {
  Featured?: VideoItem;
  TendingNow?: VideoItem[];
}

export function useVideos() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [trendingVideos, setTrendingVideos] = useState<VideoItem[]>([]);
  const [featuredVideo, setFeaturedVideo] = useState<VideoItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const response = await fetch("/data/videos.json");
        const data: VideosResponse = await response.json();

        const allVideos: VideoItem[] = [];

        // Add featured video
        if (data.Featured) {
          const featured: VideoItem = {
            ...data.Featured,
            Id: data.Featured.Id,
            Title: data.Featured.Title,
            VideoUrl: data.Featured.VideoUrl,
            thumbnail: `/placeholder.svg?height=330&width=220&query=${encodeURIComponent(
              data.Featured.Title
            )}`,
            isTrending: false,
            isFeatured: true,
          };
          allVideos.push(featured);
          setFeaturedVideo(featured);
        }

        // Add trending videos
        if (data.TendingNow && Array.isArray(data.TendingNow)) {
          const trending: VideoItem[] = data.TendingNow.map((item) => ({
            ...item,
            Id: item.Id,
            Title: item.Title,
            thumbnail: `/placeholder.svg?height=330&width=220&query=${encodeURIComponent(
              item.Title
            )}`,
            isTrending: true,
            isFeatured: false,
          }));

          allVideos.push(...trending);

          // Apply session storage sorting to trending videos
          const sortedTrending = sortByLastSeen(trending);
          setTrendingVideos(sortedTrending);
        }

        setVideos(allVideos);
      } catch (error) {
        console.error("Failed to load videos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  const sortByLastSeen = (videos: VideoItem[]): VideoItem[] => {
    const lastSeenIds = readSessionArray("filmsOrdering");
    const clicked: VideoItem[] = [];
    const rest: VideoItem[] = [];
    const lastSeenSet = new Set(lastSeenIds);

    // Separate clicked and unclicked videos
    for (const video of videos) {
      if (lastSeenSet.has(video.Id)) {
        clicked.push(video);
      } else {
        rest.push(video);
      }
    }

    // Sort clicked videos by lastSeenIds order
    clicked.sort(
      (a, b) => lastSeenIds.indexOf(a.Id) - lastSeenIds.indexOf(b.Id)
    );

    return [...clicked, ...rest];
  };

  const handleVideoClick = (video: VideoItem): void => {
    setFeaturedVideo(video);
    pushUniqueFront("filmsOrdering", video.Id);

    // Re-sort trending videos
    const sortedTrending = sortByLastSeen(trendingVideos);
    setTrendingVideos(sortedTrending);
  };

  return {
    videos,
    trendingVideos,
    featuredVideo,
    loading,
    handleVideoClick,
  };
}
