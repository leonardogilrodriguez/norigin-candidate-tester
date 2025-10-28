import { getFiveDayLabels } from '@utils/dates';
import styles from './dayrow.module.css';

const DaysRow = () => {
    const arrayDays = getFiveDayLabels();
    return (
        <section className={styles.wrapper} aria-label={'days row'}>
            {arrayDays.map((day:Day, index:number) => (
              <div key={`dayrow-${index}`} className={index === 2 ? styles.today : styles.day}>
                  <span>{day.name}</span>
                  <span>{day.date}</span>
              </div>
          ))}
        </section>
    );
}

export default DaysRow;