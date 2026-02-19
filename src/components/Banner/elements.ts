import styled, { style } from '@n3e/styled';

export const BannerRoot = styled.div({
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  minHeight: '400px'
});

type FrameProps = {
  children?: React.ReactNode;
  aspectRatio?: number;
  className?: string;
};

export const Frame = styled.div<FrameProps>({
  position: 'absolute',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  backgroundColor: 'rgba(0, 0, 0, 0.11)',
  [style.prop<FrameProps>('aspectRatio')]: (aspectRatio: number) => ({
    position: 'relative',
    paddingBottom: `${aspectRatio.toFixed(2)}%`,
    height: 0
  })
});

type ImageProps = {
  alt: string;
  isVisible?: boolean;
  onLoad?: () => void;
  src: string;
};

export const Image = styled.img<ImageProps>({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  opacity: 0,
  transition: 'opacity 0.4s ease',
  [style.prop<ImageProps>('isVisible')]: {
    opacity: 1
  }
});
