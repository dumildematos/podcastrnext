import Image from 'next/image'
import { useContext } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext';
import Episode from '../../pages/episode/[slug]';
import styles from './styles.module.scss';

export function Player () {
    
    const { episodeList, currentEpisodeIndex } = useContext(PlayerContext);
    const episode = episodeList[currentEpisodeIndex];
    return (
        <div className={styles.playerContainer}>
        
            <header>
                <Image src="/playing.svg" alt="Tocando Agora" width="40" height="100" />
                <strong>Tocando agora </strong>
            </header>

            {
                episode ? (
                    <div className={styles.currentEpisode}>
                        <Image src={episode.thumbnail} alt={episode.title} width="592" height="592" objectFit="cover" />
                        <strong>{episode.title}</strong>
                        <span>{episode.members}</span>
                    </div>
                ) : (
                <div className={styles.emptyPlayer}>
                    <strong>Selecione um episodio para ouvir</strong>
                </div>
                )
            }

            <footer className={styles.empty}>
                
                <div className={styles.progress}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                    <div className={styles.emptySlider} />
                    </div>
                    <span>00:00</span>
                </div>
                
                <div className={styles.buttons}>
                    <button type="button">
                        <Image src="/shuffle.svg" alt="Embaralhar" width="40" height="40"/>
                    </button>
                    <button type="button">
                        <Image src="/play-previous.svg" alt="Tocar Anterior" width="40" height="40" />
                    </button>
                    <button type="button" className={styles.playButton}>
                        <Image src="/play.svg" alt="Tocar" width="40" height="40" />
                    </button>
                    <button type="button">
                        <Image src="/play-next.svg" alt="Tocar Próximo" width="40" height="40" />
                    </button>
                    <button type="button">
                        <Image src="/repeat.svg" alt="Repetir" width="40" height="40" />
                    </button>
                </div>

            </footer>
        </div>
    )
}