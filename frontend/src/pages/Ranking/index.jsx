import { NavBar } from '../../components/Nav'
import { getRanking } from '../../services/game'
import styles from './Ranking.module.css'
import { useEffect, useState } from 'react'
import { FaRankingStar, FaCrown, FaMedal, FaUser, FaClock, FaStar } from "react-icons/fa6";

export function Ranking() {
  const [ranking, setRanking] = useState([])
  const [filtro, setFiltro] = useState('global')
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    setCarregando(true)
    getRanking(setRanking).finally(() => setCarregando(false))
  }, [])

  const interpretarDificuldade = (dif) => {
    const mapa = { f: "Fácil", m: "Médio", d: "Difícil" };
    return mapa[dif.toLowerCase()] || "Desconhecido";
  };

  const iconeMedalha = (posicao) => {
    if (posicao === 1) return <FaCrown className={styles.ouro} />;
    if (posicao === 2) return <FaMedal className={styles.prata} />;
    if (posicao === 3) return <FaMedal className={styles.bronze} />;
    return posicao;
  };

  const formatarTempo = (tempoSegundos) => {
    if (tempoSegundos >= 60) {
      const minutos = Math.floor(tempoSegundos / 60);
      const segundos = tempoSegundos % 60;
      return `${minutos}m ${segundos.toString().padStart(2, '0')}s`;
    }
    return `${tempoSegundos}s`;
  };

  const rankingFiltrado = filtro === 'global'
    ? ranking
    : ranking.filter(item => item.dificuldade.toLowerCase() === filtro.charAt(0));

  return (
    <div className={styles.container}>
      <NavBar />
      <main>
        <div className={styles.header}>
          <h1><FaRankingStar /> Ranking</h1>
          <p>Veja os melhores jogadores</p>
        </div>

        <div className={styles.filtros}>
          <button 
            className={filtro === 'global' ? styles.ativo : ''}
            onClick={() => setFiltro('global')}
          >
            Global
          </button>
          <button 
            className={filtro === 'facil' ? styles.ativo : ''}
            onClick={() => setFiltro('facil')}
          >
            Fácil
          </button>
          <button 
            className={filtro === 'medio' ? styles.ativo : ''}
            onClick={() => setFiltro('medio')}
          >
            Médio
          </button>
          <button 
            className={filtro === 'dificil' ? styles.ativo : ''}
            onClick={() => setFiltro('dificil')}
          >
            Difícil
          </button>
        </div>

        <div className={styles.tabelaRanking}>
          {carregando ? (
            <div className={styles.carregando}>
              <div className={styles.spinner}></div>
              <p>Carregando ranking...</p>
            </div>
          ) : rankingFiltrado.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Pos.</th>
                  <th>Jogador</th>
                  <th>Anime</th>
                  <th>Dificuldade</th>
                  <th>Tempo</th>
                  <th>Pontuação</th>
                </tr>
              </thead>
              <tbody>
                {rankingFiltrado.map((item, index) => (
                  <tr key={index} className={index < 3 ? styles.top3 : ''}>
                    <td className={styles.posicao}>
                      {iconeMedalha(index + 1)}
                    </td>
                    <td className={styles.jogador}>
                      <FaUser /> {item.user}
                    </td>
                    <td>{item.anime}</td>
                    <td>
                      <span className={`${styles.dificuldade} ${styles[item.dificuldade.toLowerCase()]}`}>
                        {interpretarDificuldade(item.dificuldade)}
                      </span>
                    </td>
                    <td className={styles.tempo}>
                      <FaClock /> {formatarTempo(item.tempo)}
                    </td>
                    <td className={styles.pontuacao}>
                      <FaStar /> {item.total_pontos}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={styles.vazio}>
              <p>Nenhum resultado encontrado</p>
              <span>Tente alterar os filtros ou jogue uma partida para aparecer aqui!</span>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
