import React from 'react';

export const ProjectCardSkeleton: React.FC = () => {
  return (
    <div
      className="bg-ivory border border-line rounded-sm overflow-hidden flex flex-col h-full animate-pulse"
      aria-hidden="true"
    >
      {/* Image Skeleton */}
      <div className="relative aspect-[16/10] bg-line/60 w-full overflow-hidden">
        <div className="absolute top-3 left-3 w-20 h-5 bg-cream/70 rounded-xs" />
        <div className="absolute top-3 right-3 w-24 h-5 bg-cream/70 rounded-xs" />
      </div>

      {/* Content Skeleton */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="w-1/3 h-3 bg-line/70 rounded-xs" />
          <div className="w-3/4 h-6 bg-line/80 rounded-xs" />
          <div className="w-1/2 h-3.5 bg-line/60 rounded-xs" />
        </div>

        {/* Specs Grid Skeleton */}
        <div className="grid grid-cols-2 gap-3 py-3 border-y border-line/60">
          <div className="space-y-1">
            <div className="w-12 h-2.5 bg-line/50 rounded-xs" />
            <div className="w-20 h-3.5 bg-line/70 rounded-xs" />
          </div>
          <div className="space-y-1">
            <div className="w-12 h-2.5 bg-line/50 rounded-xs" />
            <div className="w-20 h-3.5 bg-line/70 rounded-xs" />
          </div>
        </div>

        {/* Bottom CTA Skeleton */}
        <div className="flex items-center justify-between pt-1">
          <div className="w-24 h-5 bg-line/70 rounded-xs" />
          <div className="w-20 h-8 bg-line/60 rounded-sm" />
        </div>
      </div>
    </div>
  );
};
