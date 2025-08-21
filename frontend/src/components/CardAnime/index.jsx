import styles from './Card.module.css'
import OnePiece from '../../assets/imgs/onepiece.webp'

export function CardAnime({capa, descricao, fundo, nome, animeId, setAnime}) {
    return(
        <div className={styles.card} onClick={() => setAnime(animeId)}>
            <img src={capa} alt="Capa do Anime" />
            <div className={styles.cardInfo}>
                <h1>{nome}</h1>
                <p>{descricao}</p>

                <div>
                    <p>10 cartas</p>
                    <p>24 perguntas</p>
                </div>
            </div>
        </div>
    )
}