import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  width?: number;
  height?: number;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage = ({
  src,
  alt,
  className,
  placeholderClassName,
  width,
  height,
  sizes,
  loading = 'lazy',
  onLoad,
  onError,
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(loading === 'eager');
  const imgRef = useRef<HTMLImageElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading === 'lazy') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        {
          rootMargin: '50px',
        }
      );

      if (placeholderRef.current) {
        observer.observe(placeholderRef.current);
      }

      return () => observer.disconnect();
    }
  }, [loading]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate optimized image URLs for different screen sizes
  const generateSrcSet = (originalSrc: string) => {
    if (originalSrc.includes('unsplash.com')) {
      const baseUrl = originalSrc.split('?')[0];
      return `
        ${baseUrl}?w=300&h=200&fit=crop&q=75&auto=format 300w,
        ${baseUrl}?w=600&h=400&fit=crop&q=80&auto=format 600w,
        ${baseUrl}?w=900&h=600&fit=crop&q=85&auto=format 900w,
        ${baseUrl}?w=1200&h=800&fit=crop&q=90&auto=format 1200w
      `.replace(/\s+/g, ' ').trim();
    }
    return undefined;
  };

  // Generate WebP format for better compression
  const generateWebPSrcSet = (originalSrc: string) => {
    if (originalSrc.includes('unsplash.com')) {
      const baseUrl = originalSrc.split('?')[0];
      return `
        ${baseUrl}?w=300&h=200&fit=crop&q=75&auto=format&fm=webp 300w,
        ${baseUrl}?w=600&h=400&fit=crop&q=80&auto=format&fm=webp 600w,
        ${baseUrl}?w=900&h=600&fit=crop&q=85&auto=format&fm=webp 900w,
        ${baseUrl}?w=1200&h=800&fit=crop&q=90&auto=format&fm=webp 1200w
      `.replace(/\s+/g, ' ').trim();
    }
    return undefined;
  };

  const srcSet = generateSrcSet(src);
  const webPSrcSet = generateWebPSrcSet(src);

  return (
    <div ref={placeholderRef} className={cn('relative overflow-hidden', className)}>
      {/* Placeholder */}
      {!isLoaded && !hasError && (
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br from-muted via-muted/80 to-muted/60 animate-pulse',
            placeholderClassName
          )}
          style={{ width, height }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div
          className={cn(
            'absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground text-sm',
            placeholderClassName
          )}
          style={{ width, height }}
        >
          <span>Failed to load image</span>
        </div>
      )}

      {/* Actual image */}
      {isInView && (
        <picture>
          {webPSrcSet && (
            <source
              type="image/webp"
              srcSet={webPSrcSet}
              sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
            />
          )}
          <img
            ref={imgRef}
            src={src}
            srcSet={srcSet}
            sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              'transition-opacity duration-300 optimized-image',
              isLoaded ? 'opacity-100' : 'opacity-0',
              className
            )}
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            }}
            decoding="async"
            fetchPriority={loading === 'eager' ? 'high' : 'auto'}
          />
        </picture>
      )}
    </div>
  );
};

export default LazyImage;