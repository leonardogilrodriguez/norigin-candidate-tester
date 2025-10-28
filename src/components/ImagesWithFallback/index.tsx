'use client';
import { useState } from 'react';
import Image from 'next/image';

type ImagewithFallbackProps = {
  src: string,
  fallbackSrc: string,
  alt: string,
  width: number,
  height: number,
  loading: 'eager' | 'lazy',
  fetchPriority: 'high' | 'low' | 'auto';
}

const ImageWithFallback = (props: ImagewithFallbackProps) => {
    const { src, fallbackSrc, alt, ...rest } = props;
    const [imgSrc, setImgSrc] = useState(src);
    const [isLoaded, setIsLoaded] = useState(false);

    if (!src) return null;

    return (
        <Image
            {...rest}
            alt={alt}
            src={imgSrc}
            style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.2s' }}
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              if (imgSrc === src) {
                setImgSrc(fallbackSrc);
              } else {
                setIsLoaded(true);
              }
            }}
        />
    );
};

export default ImageWithFallback;