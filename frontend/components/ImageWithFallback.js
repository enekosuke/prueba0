import Image from 'next/image';
import { useEffect, useState } from 'react';

const PLACEHOLDER_SRC = '/images/placeholder.svg';

export default function ImageWithFallback({ src, alt, ...props }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  const imageSrc = !hasError && src ? src : PLACEHOLDER_SRC;

  return (
    <Image
      {...props}
      src={imageSrc}
      alt={alt}
      onError={() => setHasError(true)}
      placeholder="empty"
    />
  );
}
