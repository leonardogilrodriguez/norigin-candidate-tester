import DaysRow from '../DaysRow';
import HoursRow from '../HoursRow';
import Channels from '../Channels';
import Schedules from '../Schedules';
import EPGWrapper from '../EpgWrapper';
import { currentHourScroll } from '@/src/utils/dates';
import { fetchEPGData } from '@/src/ExternalAPI/EPG';
import { PIXELS_PER_MINUTE } from '@/src/utils/constants';

const EPGView = async () => {
  const EPG_DATA = await fetchEPGData();
  const { channels } = EPG_DATA || {};
  const initialScrollLeft = currentHourScroll();
  const channelsInfo = channels?.map((channel: Channel) => ({
      id: channel.id,
      title: channel.title,
      images: channel.images
  }));

  const calculatedWitdh = 24 * 60 * PIXELS_PER_MINUTE;

  return (
    <>
      <DaysRow />
        <Channels channels={channelsInfo} />
        <EPGWrapper initialScrollLeft={initialScrollLeft}>
          <HoursRow />
          <section style={{ position: 'relative', width: calculatedWitdh }}>
            <Schedules channels={channels} />
          </section>
        </EPGWrapper>
      </>
    );
};

export default EPGView;