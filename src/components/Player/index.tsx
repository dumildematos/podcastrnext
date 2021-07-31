import Image from 'next/image'
import styles from './styles.module.scss';

export function Player () {
    return (
        <div className={styles.playerContainer}>
        
            <header>
                <Image src="/playing.svg" alt="Tocando Agora" width="40" height="100" />
                <strong>Tocando agora</strong>
            </header>

            
            <div className={styles.emptyPlayer}>
                <strong>Selecione um episodio para ouvir</strong>
            </div>

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