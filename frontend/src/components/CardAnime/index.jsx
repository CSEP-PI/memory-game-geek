import styles from './Card.module.css'
import OnePiece from '../../assets/imgs/onepiece.webp'
import { TbCardsFilled } from "react-icons/tb";

export function CardAnime({ capa, descricao, fundo, nome, animeId, setAnime, setNome, className }) {
    return (
        <div className={styles.card} onClick={() => {
            setAnime(animeId)
            setNome(nome)
        }}>
            <img src={capa} alt="Capa do Anime" />
            <div className={styles.cardInfo}>
                <h1>{nome}</h1>
                <p>{descricao}</p>

                <div>
                    <p><span>10</span> <TbCardsFilled/></p>
                    <p>24 perguntas</p>
                </div>
            </div>
        </div>
    )
}