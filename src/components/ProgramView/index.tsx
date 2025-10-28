import styles from './ProgramView.module.css';
import YoutubePlayer from './subcomponents/YoutubePlayer';
import ProgramSchedule from './subcomponents/Programschedule';
import Episodes from './subcomponents/Episodes';
import { fetchProgramData } from '@/src/ExternalAPI/Program';

const ProgramView = async ({ id }: { id: string }) => {
        const PROGRAM_DATA = await fetchProgramData();
        const { meta, title, images, description, series } = PROGRAM_DATA;
        const cast = meta?.cast.map((member: CastCreator) => member.name);
        const creators = meta?.creators.map((member: CastCreator) => member.name);

    return (<article>
        <YoutubePlayer programImage={images} id={id} title={title}/>
        <div className={styles.programWrapper}>
          <ProgramSchedule programData={PROGRAM_DATA} />
          <main>
          <p className={styles.programDescription}>{description}</p>
          <p className={styles.programCastCreators}>{`Cast: ${cast.join(', ')}`}</p>
          <p className={styles.programCastCreators}>{`Creators: ${creators.join(', ')}`}</p>
          </main>
          <Episodes series={series} />
        </div>
    </article>);
}

export default ProgramView;