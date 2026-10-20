"use client";

import React, { useState } from 'react';
import { SkeletonImage as Image } from "@/components/ui/skeleton-image";
import { resolveImageUrl, cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";
import { ImageProps } from 'next/image';

interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src?: string | null;
  sourceUrl?: string | null;
  wrapperClassName?: string;
  fallbackIcon?: React.ReactNode;
}

export function SafeImage({
  src,
  sourceUrl,
  alt,
  className,
  wrapperClassName,
  fallbackIcon,
  ...props
}: SafeImageProps) {
  const [error, setError] = useState(false);

  // If sourceUrl is available, prioritize it immediately. Otherwise fallback to resolving local src.
  const finalSrc = sourceUrl || resolveImageUrl(src);

  if (!finalSrc || error) {
    return (
      <div className={cn("w-full h-full flex items-center justify-center bg-emerald-50 dark:bg-zinc-800/80", wrapperClassName, className)}>
        {fallbackIcon || <ImageIcon className="w-10 h-10 text-emerald-200 dark:text-zinc-700" strokeWidth={1} />}
      </div>
    );
  }

  return (
    <Image
      src={finalSrc}
      alt={alt || "Image"}
      className={className}
      wrapperClassName={wrapperClassName}
      onError={(e) => {
        setError(true);
        if (props.onError) props.onError(e);
      }}
      {...props}
    />
  );
}
