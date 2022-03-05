import React from 'react';

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  readonly url: string;
  readonly fallbackUrl?: string;
};

const Image: React.FC<ImageProps> = ({ url, fallbackUrl, ...props }) => (
  <img
    alt=""
    {...props}
    src={url}
    onError={(event) => {
      const element = event.currentTarget;

      if (fallbackUrl) {
        element.src = fallbackUrl;
      } else {
        element.style.visibility = 'hidden';
      }
      props.onError?.(event);
    }}
  />
);

export default Image;
