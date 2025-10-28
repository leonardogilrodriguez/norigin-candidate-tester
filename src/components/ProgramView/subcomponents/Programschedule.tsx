import { formatDate } from '@utils/dates';
import styles from '../ProgramView.module.css';
import Image from "next/image";
import { getImagesWithFallback } from '@/src/utils/fallbackImages';

const ProgramSchedule = ({ programData }: { programData: ProgramData }) => {
    const releaseDate = new Date(programData.start);
    const releaseDateString = releaseDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long"
    });
    const scheduleTime = `${formatDate(programData.start)} - ${formatDate(programData.end)} · ${releaseDateString}`;
    // I will get the image form the fallback
    const { fallback: logoChannel } = getImagesWithFallback({ logo: ''}, programData.channelId);

    return (<header className={styles.grid}>
      <aside className={styles.side_left}>
      <Image src={logoChannel} alt={`logo ${programData.channelTitle}`} width={60} height={60}></Image>
      </aside>
      <main className={`${styles.mid_1}`}>
      <div className={styles.programSchedule}>
         <span className={styles.channelTitle}>{programData.channelTitle}</span>
         <span className={styles.scheduleTime}>{scheduleTime}</span>
      </div>
      </main>
      <main className={`${styles.mid_2}`}><h1 className={styles.programTitle}>{programData.title}</h1></main>
      <main className={`${styles.mid_3}`}><div className={styles.programYearGenre}>
        <span>{programData.meta.year}</span>
          {
            programData.meta.genres.map((genre: string, idx: number) => (
              <span key={`genre-${idx}`}>{genre}</span>
            ))
          }
        </div>
      </main>
      <aside className={styles.side_right}>
        <Image src={'/icons/clock.svg'} alt={'clock icon'} width={60} height={60}></Image>
      </aside>
    </header>)
}

export default ProgramSchedule;