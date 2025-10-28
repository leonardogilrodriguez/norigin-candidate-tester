'use client';
import { useState } from 'react';
import styles from '../ProgramView.module.css';

const Episodes = ({ series }: { series: Serie[]}) => {
  const [episodes, setEpisodes] = useState(series[0]?.episodes);
  const [season, setSeason] = useState(0)

  const onSeasonClick = (season: number) => {
    const list = series[season]?.episodes;
    setSeason(season);
    setEpisodes(list);
  }

  return (
    <section role='region' aria-label={'List of episodes'} className={styles.episodesWrapper}>
      <div className={styles.buttonTabs}>
        {
          series.map((serie: Serie, idx: number) => (
            <button key={`series-button-${idx}`} className={`${ idx === season ? styles.serieButtonSelected : '' }`} onClick={() => onSeasonClick(idx)}>{serie.title}</button>
          ))
        }
      </div>
      <div className={styles.episodesList}>
        {
          <ul key={`ul-key-${season}`}>
          {
              episodes.map((episode: Episode, idx: number) => (
                  <li key={`episode-${idx}`} className={'fade-in'}>{`Episode ${idx +1}: ${episode.title}`}</li>
              ))
          }
          </ul>
        }
      </div>
    </section>
  );
}

export default Episodes;