'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './EpgWrapper.module.css';
import { currentHourScroll } from '@/src/utils/dates';

const EPGWrapper = ({ children, initialScrollLeft } : { children: React.ReactNode, initialScrollLeft: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isProgrammaticScroll = useRef(true);
    const [isUserScrolling, setIsUserScrolling] = useState(false);

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
    }

    return (
        <main className={styles.epg_wrapper} ref={ref}>
            {children}
            {isUserScrolling && <button className={styles.button} onClick={onNowClick}>Now</button>}
        </main>
    );
}

export default EPGWrapper;