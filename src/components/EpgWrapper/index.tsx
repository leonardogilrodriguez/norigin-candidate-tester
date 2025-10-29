'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './EpgWrapper.module.css';
import { currentHourScroll } from '@/src/utils/dates';
import { useNavigationStore } from '@/src/stores/navigationStore';
import { columnNow } from '@/src/utils/spatialNavigation';

const EPGWrapper = ({ children, initialScrollLeft, channels } : { children: React.ReactNode, initialScrollLeft: number, channels: Channel[] }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isProgrammaticScroll = useRef(true);
    const [isUserScrolling, setIsUserScrolling] = useState(false);
    const { activeRowIndex, setActiveCell } = useNavigationStore();

    useLayoutEffect(() => {
        if (ref.current) {
            ref.current.scrollLeft = initialScrollLeft;
        }
    }, [initialScrollLeft]);

    useEffect(() => {
        const currentRef = ref.current;
        const handleScroll =() => {
            if (!isProgrammaticScroll.current) {
                setIsUserScrolling(true);
            } else {
                isProgrammaticScroll.current = false;
            }
        };

        if (currentRef) {
        currentRef.addEventListener('scroll', handleScroll);
        return () => {
            currentRef.removeEventListener('scroll', handleScroll);
        };
        }
    }, []);

    const onNowClick = () => {
        const newScrollPosition = currentHourScroll();
        if (ref.current) {
            isProgrammaticScroll.current = true;
            ref.current.scrollTo({
              left: newScrollPosition,
              behavior: 'smooth'
            });
            setIsUserScrolling(false);
        }
        //position the keys
        const column = columnNow(channels, activeRowIndex);
        setActiveCell(activeRowIndex, column);
    }

    return (
        <main className={styles.epg_wrapper} ref={ref}>
            {children}
            {isUserScrolling && <button className={styles.button} onClick={onNowClick}>Now</button>}
        </main>
    );
}

export default EPGWrapper;