import React, { useState } from 'react';
import {
  BannerRoot,
  Frame,
  Image
  
} from './elements';

type BannerProps = {
  imageSource: string;
  width?: number;
  height?: number;
};

export const Banner = ({
  imageSource
  // width = 1600,
  // height = 900
}: BannerProps) => {
  // const [isLoaded, setIsLoaded] = useState(true);
  const [isLoaded] = useState(true);

  return (
    <BannerRoot>
      <Frame
        // isLoading={hasLoader && !isLoaded}
        // aspectRatio={(height / width) * 100}
      >
        <Image
          // onLoad={() => setIsLoaded(true)}
          isVisible={isLoaded}
          alt=""
          src={imageSource}
        />
      </Frame>
    </BannerRoot>
  );
};
