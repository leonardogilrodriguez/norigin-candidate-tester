import styles from './hourrow.module.css';

const HoursRow = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    return (
        <section className={styles.wrapper} role={'region'} aria-label={'hours row'}>
            {hours.map((hour) => (
                <div key={`hourrow-${hour}`} className={styles.hour}>
                    <span className={`${styles.hourNumber}`}>{`${hour}:00`}</span>
                </div>
            ))}
            <div className={styles.hour}></div>
        </section>
    );
}

export default HoursRow;