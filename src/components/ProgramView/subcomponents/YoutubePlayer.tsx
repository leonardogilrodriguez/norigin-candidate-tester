'use client';

import { useState } from 'react';
import ReactPlayer from 'react-player';
import Image from 'next/image';
import { getImagesWithFallback, dummy_program_id_video } from "@/src/utils/fallbackImages";
import styles from '../ProgramView.module.css';
import ImageWithFallback from '../../ImagesWithFallback';

const YouTubeLightPlayer = ({ programImage, id, title }: { programImage: ImagesNM, id: string, title: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const parsedImage = {
    logo: programImage.icon as string
  }
  const images = getImagesWithFallback(parsedImage, id);
  const { logo: image, fallback } = images;

  let tag = (<div className={'fade-in'} onClick={() => setIsPlaying(true)}>
      <ImageWithFallback src={image} alt={title} width={1280} height={600} loading='eager' fetchPriority='high' fallbackSrc={fallback}></ImageWithFallback>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 80,
          height: 80,
          backgroundColor: 'rgba(0,0,0,0.6)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px',
        }}
      >
        <Image src={'/play-button.svg'} alt='play-button' width={80} height={80} loading={'eager'} style={{ backgroundColor: 'white', borderRadius: '50%'}}/>
      </div>
  </div>
  );

  if (isPlaying) {
    tag = (
      <ReactPlayer
        src={dummy_program_id_video}
        controls
        playing
        width={'100%'}
        height={'100%'}
        config={{
          youtube: {
            rel: 0,
          },
        }}
        onEnded={() => setIsPlaying(false)}
        onError={() => setIsPlaying(false)}
      />
    );
  }

  return (<div className={styles.youtubePlayerWrapper}>{tag}</div>)
};

export default YouTubeLightPlayer;