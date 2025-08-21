"use client";

import type { FC } from "react";
import { FeaturedContent } from "@components/FeaturedContent";
import { useVideos } from "@hooks/useVideos";
import { Carousel } from "@components/Carousel";
import type { VideoItem } from "@components/ui/Button/types.video";
import { SideMenu } from "@components/SideMenu";

const HomePage: FC = () => {
  const { trendingVideos, featuredVideo, loading, handleVideoClick } =
    useVideos();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!featuredVideo) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">No content available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black ">
      <SideMenu />
      <div className="flex flex-col">
        <FeaturedContent video={featuredVideo as VideoItem} />
        <Carousel
          videos={trendingVideos as VideoItem[]}
          onVideoClick={handleVideoClick}
        />
      </div>
    </div>
  );
};

export default HomePage;
