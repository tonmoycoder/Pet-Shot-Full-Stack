"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface SkeletonImageProps extends ImageProps {
  wrapperClassName?: string;
}

export function SkeletonImage({
  src,
  alt,
  className,
  wrapperClassName,
  onLoadingComplete,
  onLoad,
  onError,
  sizes,
  ...props
}: SkeletonImageProps) {
  // If priority is set, bypass skeleton to immediately paint LCP
  const isPriority = props.priority;
  const [isLoading, setIsLoading] = useState(!isPriority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!isPriority && imgRef.current?.complete) {
      setIsLoading(false);
    }
  }, [isPriority]);

  return (
    <div className={cn(
      "overflow-hidden", 
      props.fill ? "absolute inset-0" : "relative inline-block w-full h-full",
      wrapperClassName
    )}>
      {/* Skeleton Background */}
      {!isPriority && (
        <div 
          className={cn(
            "absolute inset-0 transition-opacity duration-500 z-0",
            isLoading ? "skeleton-shimmer opacity-100" : "opacity-0 pointer-events-none"
          )} 
        />
      )}
      
      {isPriority ? (
        <Image
          ref={imgRef as any}
          src={src}
          alt={alt || "Image"}
          priority
          sizes={props.fill ? (sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw") : sizes}
          className={cn("z-10", className)}
          onLoad={(e) => {
            if (onLoad) onLoad(e);
          }}
          {...props}
        />
      ) : (
        <Image
          ref={imgRef}
          src={src}
          alt={alt || "Image"}
          sizes={props.fill ? (sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw") : sizes}
          className={cn(
            "transition-all duration-700 ease-in-out z-10",
            className,
            isLoading && "scale-105 blur-md opacity-0"
          )}
          onLoad={(e) => {
            setIsLoading(false);
            if (onLoad) onLoad(e);
          }}
          onError={(e) => {
            setIsLoading(false);
            if (onError) onError(e);
          }}
          {...props}
        />
      )}
    </div>
  );
}
