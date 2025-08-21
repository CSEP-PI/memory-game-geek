import styles from './Lobby.module.css'
import { NavBar } from '../../components/Nav'
import { CardAnime } from '../../components/CardAnime'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { getAnimes } from '../../services/game'

export function Lobby() {
    const navigate = useNavigate()

    const [animes, setAnimes] = useState([])
    const [animeId, setAnimeId] = useState(false)
    const [dificuldade, setDificuldade] = useState(false)

    useEffect(() => {
        getAnimes(setAnimes)
    }, [])

    function goGame() {
        if (!animeId || !dificuldade) {
            return alert('Selecione um anime e uma dificuldade para iniciar o jogo!')
        }

        navigate(`/game/${animeId}/${dificuldade}`)
    }

    return (
        <div className={styles.container}>
            <NavBar />

            <main>
                <div className={styles.areaTitulo}>
                    <h1>Escolha seu Anime</h1>
                    <p>Selecione um anime e teste sua memória!</p>
                </div>

                <section className={styles.areaCards}>
                    {animes.map((item) => 
                        <CardAnime 
                            capa={item.capa_img}
                            descricao={item.descricao}
                            fundo={item.fundo_img}
                            nome={item.nome}
                            animeId={item.id}
                            setAnime={setAnimeId}
                        />
                    )}

                    
                </section>

                <section className={styles.areaDificuldade}>
                    <h1>Escolha a dificuldade</h1>

                    <div className={styles.areaCardsDf} >
                        <div className={styles.cardDfF} onClick={() => setDificuldade('F')}>
                            <h1>Fácil</h1>
                            <h2>6 pares de cartas</h2>
                            <p>Multiplicador: 1.0x</p>
                            <p>Tempo Alvo: 3 min</p>
                        </div>

                        <div className={styles.cardDfM} onClick={() => setDificuldade('M')}>
                            <h1>Médio</h1>
                            <h2>8 pares de cartas</h2>
                            <p>Multiplicador: 1.5x</p>
                            <p>Tempo Alvo: 4 min</p>
                        </div>

                        <div className={styles.cardDfD} onClick={() => setDificuldade('D')}>
                            <h1>Difícil</h1>
                            <h2>10 pares de cartas</h2>
                            <p>Multiplicador: 2.0x</p>
                            <p>Tempo Alvo: 5 min</p>
                        </div>
                    </div>

                </section>

                <button onClick={() => goGame()}>Start Game</button>
            </main>
        </div>
    )
}