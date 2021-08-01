import Image from 'next/image'
import { useContext, useEffect, useRef } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext';
import styles from './styles.module.scss';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'

export function Player () {
    
    const audioRef = useRef<HTMLAudioElement>(null)

    const { 
        episodeList, 
        currentEpisodeIndex , 
        isPlaying,
        togglePlay,
        setPlayingState
    } = useContext(PlayerContext);

    const episode = episodeList[currentEpisodeIndex];

    useEffect(()=> {
        if(!audioRef.current){
            return;
        }

        if(isPlaying){
            audioRef.current.play();
        }else{
            audioRef.current.pause();
        }

    }, [isPlaying])

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

            <footer className={!episode ? styles.empty : ''}>
                
                <div className={styles.progress}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                        {
                            episode ? (
                                <Slider 
                                    trackStyle={{ backgroundColor: '#04d361' }}
                                    railStyle={{ backgroundColor: '#9f75ff' }}
                                    handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                                />
                            ): (    
                                <div className={styles.emptySlider} />
                            )
                        }
                    </div>
                    <span>00:00</span>
                </div>
                
                {
                    episode && (
                        <audio 
                            src={episode.url} 
                            ref={audioRef}
                            autoPlay
                            onPlay={()=> setPlayingState(true)}
                            onPause={()=> setPlayingState(false)}
                        />
                    )
                }

                <div className={styles.buttons}>
                    <button type="button" disabled={!episode}>
                        <Image src="/shuffle.svg" alt="Embaralhar" width="40" height="40"/>
                    </button>
                    <button type="button" disabled={!episode}>
                        <Image src="/play-previous.svg" alt="Tocar Anterior" width="40" height="40" />
                    </button>
                    <button type="button" 
                    className={styles.playButton} 
                    disabled={!episode}
                    onClick={togglePlay}
                    >
                        {
                            isPlaying ?
                                <Image src="/pause.svg" alt="Tocar" width="40" height="40" />
                            :  <Image src="/play.svg" alt="Tocar" width="40" height="40" />
                        }
                    </button>
                    <button type="button" disabled={!episode}>
                        <Image src="/play-next.svg" alt="Tocar Próximo" width="40" height="40" />
                    </button>
                    <button type="button" disabled={!episode}>
                        <Image src="/repeat.svg" alt="Repetir" width="40" height="40" />
                    </button>
                </div>

            </footer>
        </div>
    )
}