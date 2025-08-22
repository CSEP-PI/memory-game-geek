import { NavBar } from '../../components/Nav'
import { getRanking } from '../../services/game'
import styles from './Ranking.module.css'
import { useEffect, useState } from 'react'
import { FaRankingStar } from "react-icons/fa6";

export function Ranking() {

  const [ranking, setRanking] = useState([])

  useEffect(() => {
    getRanking(setRanking)
  }, [])

  const interpretarDificuldade = (dif) => {
    const map = { f: "Fácil", m: "Médio", d: "Difícil" };
    return map[dif.toLowerCase()] || "Desconhecido";
  };

  const calcularPosicao = (itens) => {
    return itens.length;
  };

  const formatarTempo = (tempoSegundos) => {
    if (tempoSegundos >= 60) {
      const minutos = Math.floor(tempoSegundos / 60);
      const segundos = tempoSegundos % 60;
      return `${minutos}m ${segundos}s`;
    }
    return `${tempoSegundos}s`;
  };

  return (
    <div className={styles.container}>
      <NavBar />
      <main>
        <h1><FaRankingStar/> Ranking</h1>
        <p>Veja os melhores jogadores</p>


        {/* <div className={styles.info}>
          <div>
            <label>Período</label>
            <select>
              <option>Todos os Tempos</option>
              <option>Último Mês</option>
              <option>Última Semana</option>
            </select>
          </div>

          <div>
            <label>Anime</label>
            <select>
              <option>Todas as opções</option>
              <option>Demon Slayer</option>
              <option>One Piece</option>
            </select>
          </div>

          <div>
            <label>Buscar jogador</label>
            <input type="text" placeholder="Digite o nome..." />
          </div>
        </div> */}


        <div className={styles.info}>
          <button>Global</button>
        </div>


        <div className={styles.game}>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
            <thead>
              <tr>
                <th>Pos.</th>
                <th>Jogador</th>
                <th>Anime</th>
                <th>Dificuldade</th>
                <th>Tempo</th>
                <th>Pontos</th>
              </tr>

              {ranking.map((item) =>
                <tr>
                  <td>{calcularPosicao(ranking)}</td>
                  <td>{item.user}</td>
                  <td>{item.anime}</td>
                  <td>{interpretarDificuldade(item.dificuldade)}</td>
                  <td>{formatarTempo(item.tempo)}</td>
                  <td>{item.total_pontos}</td>
                </tr>
              )}

            </thead>
            <tbody>
              {ranking.length == 0 &&
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '1rem' }}>
                    Nenhum resultado encontrado
                  </td>
                </tr>
              }

            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
