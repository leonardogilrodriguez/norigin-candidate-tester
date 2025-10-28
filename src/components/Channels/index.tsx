import styles from './channelscolumn.module.css';
import { getImagesWithFallback } from '@utils/fallbackImages';
import ImageWithFallback from '../ImagesWithFallback';

const Channels = ({ channels }: { channels: Channel[] }) => {
    const channelFormatted = channels?.map((channel) => ({
        ...channel,
        images: getImagesWithFallback(channel.images, channel.id)
    }));
    return (
        <aside className={`${styles.wrapper} slide-in`}>
            {channelFormatted?.map((channel) => (
                <div className={styles.channel} key={`channel-${channel.id}`}>
                  <ImageWithFallback src={channel.images.logo} alt={channel.title} width={100} height={100} loading='eager' fetchPriority='high' fallbackSrc={channel.images.fallback}></ImageWithFallback>
                </div>
            ))}
        </aside>
    );
}

export default Channels;