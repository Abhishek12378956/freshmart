import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
);

export const ProductCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
    <Skeleton className="w-full h-40 rounded-none" />
    <div className="p-3 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <div className="flex items-center justify-between mt-3">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  </div>
);

export const BannerSkeleton: React.FC = () => (
  <Skeleton className="w-full h-44 rounded-2xl" />
);

export const CategorySkeleton: React.FC = () => (
  <div className="flex flex-col items-center gap-2">
    <Skeleton className="w-16 h-16 rounded-2xl" />
    <Skeleton className="h-3 w-12" />
  </div>
);
