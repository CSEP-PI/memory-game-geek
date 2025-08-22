import { NavBar } from '../../components/Nav'
import styles from './Game.module.css'
import FundoCarta from '../../assets/imgs/fundo-carta.svg'
import { useState, useEffect } from 'react'
import { getCartas } from '../../services/game'
import { shuffle } from '../../services/ultils'
import { useParams } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { VscDebugRestart } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom'
import QuizModal from '../../components/ModalQuiz'
import { getPergunta } from '../../services/game'
import { postJogo } from '../../services/game'

export function Game() {
    const navigate = useNavigate()

    const [segundos, setSegundos] = useState(0); // segundos totais
    const [minutos, setMinutos] = useState(0);   // minutos
    const [segundosDisplay, setSegundosDisplay] = useState(0); // segundos que podem ser salvos sem alteração


    const [quizQuestoes, setQuizQuestoes] = useState([]); // todas as questões da API
    const [quizAtual, setQuizAtual] = useState(null); // questão que está sendo mostrada no modal
    const [quizModal, setQuizModal] = useState(false);
    const [quizAcertos, setQuizAcertos] = useState(0);

    const { animeId, dificuldade } = useParams();

    const [cartas, setCartas] = useState([])
    const [modal, setModal] = useState(false)

    const [virada, setVirada] = useState(false)
    const [clicada, setClicada] = useState(false)

    const [carta1, setCarta1] = useState(false)
    const [carta2, setCarta2] = useState(false)
    const [m1, setM1] = useState(false)
    const [m2, setM2] = useState(false)
    const [jogadas, setJogadas] = useState(0)
    const [pares, setPares] = useState(0)

    useEffect(() => {
        getPergunta(animeId, dificuldade, setQuizQuestoes)
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            setSegundos(prev => prev + 1);

            setSegundosDisplay(prev => (prev + 1) % 60); // sempre entre 0 e 59

            setMinutos(prev => {
                if ((segundos + 1) % 60 === 0 && segundos + 1 !== 0) {
                    return prev + 1;
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer); // limpa o intervalo ao desmontar
    }, [segundos]);

    useEffect(() => {
        async function buscarCartas() {

            const data = await getCartas(animeId)
            console.log('Data: ', data)

            let cartasSelecionadas;

            if (dificuldade === 'F') {
                cartasSelecionadas = data.slice(0, 6)
            }

            if (dificuldade === 'M') {
                cartasSelecionadas = data.slice(0, 8)
            }

            if (dificuldade === 'D') {
                cartasSelecionadas = data.slice(0, 10)
            }

            const paresCartas = [...cartasSelecionadas, ...cartasSelecionadas];

            const cartasEmbaralhadas = shuffle(paresCartas);

            setCartas(cartasEmbaralhadas)
        }

        buscarCartas()
    }, []) //observar a dificuldade

    function abrirQuiz() {
        console.log('QUESTOES:', quizQuestoes)
        if (quizQuestoes.length === 0) {
            return alert('Nada')
        };

        const index = Math.floor(Math.random() * quizQuestoes.length);
        const questao = quizQuestoes[index];

        setQuizAtual(questao);
        console.log('QUIZ ATUAL: ', questao)
        setQuizModal(true);
    }

    function verificarResposta(resposta) {
        if (resposta.is_correct) {
            setQuizAcertos(prev => prev + 1);

            // Remove a questão do state
            setQuizQuestoes(prev => prev.filter(q => q.questao.id !== quizAtual.questao.id));

            alert("Resposta correta!");
            finalizarGame(dificuldade)
        } else {
            alert("Resposta incorreta!");
            finalizarGame(dificuldade)
        }

        setQuizModal(false);
        setQuizAtual(null);
    }

    function finalizarGame(dfc){
        if (dfc === 'F') {
            if (pares === 6) {
                postJogo(animeId, jogadas, quizAcertos, segundos, dificuldade)
                alert('Fim de jogo!')
                navigate('/lobby')
            }
        }

        if (dfc === 'M') {
            if (pares === 8) {
                postJogo(animeId, jogadas, quizAcertos, segundos, dificuldade)
                alert('Fim de jogo!')
                navigate('/lobby')
            }
        }

        if (dfc === 'D') {
            if (pares === 10) {
                postJogo(animeId, jogadas, quizAcertos, segundos, dificuldade)
                alert('Fim de jogo!')
                navigate('/lobby')
            }
        }
    }


    function primeiroM(e, cartaId) {
        e.currentTarget.classList.add('virada')
        setCarta1(cartaId)
        setM1(e.currentTarget)
    }

    function segundoM(e, cartaId) {
        if (e.currentTarget.className === 'carta virada') {
            return alert('Essa carta já está virada!')
        }

        e.currentTarget.classList.add('virada')
        setCarta2(cartaId)
        setM2(e.currentTarget)
    }

    useEffect(() => {
        if (!m2) {
            return;
        };

        setTimeout(() => {
            if (carta1 === carta2) {

                setCarta1(false);
                setCarta2(false);
                setM1(null);
                setM2(null);
                setJogadas(jogadas + 1);
                setPares(pares + 1);
                setModal(!modal)
                abrirQuiz()
            } else {
                if (m1 && m2) {
                    m1.classList.remove("virada");
                    m2.classList.remove("virada");
                }
            }

            // Reseta os estados
            setCarta1(false);
            setCarta2(false);
            setM1(null);
            setM2(null);
            setJogadas(jogadas + 1);
        }, 800);
    }, [m2]);


    return (
        <div className={styles.container}>
            <NavBar />


            <main>
                <section className={styles.info}>
                    <div>
                        <h1>
                            {String(minutos).padStart(2, "0")}:
                            {String(segundosDisplay).padStart(2, "0")}
                            {}
                        </h1>
                        <p>tempo</p>
                    </div>

                    <div>
                        <h1>{pares}</h1>
                        <p>Pares</p>
                    </div>

                    <div>
                        <h1>{quizAcertos}</h1>
                        <p>Quiz</p>
                    </div>

                    <div>
                        <h1>{jogadas}</h1>
                        <p>Jogadas</p>
                    </div>
                </section>

                <section className={styles.game}>

                    {cartas.length === 0 &&
                        <h1>Sem cartas para este anime!</h1>
                    }

                    {cartas.map((item) =>
                        <div className={'carta'} onClick={(e) => {
                            if (carta1 && carta2) {
                                return;
                            }

                            if (!carta1) {
                                primeiroM(e, item.id)
                            } else {
                                segundoM(e, item.id)
                            }
                        }
                        }>
                            <div className={styles.frente}>
                                <img src={item.carta_img} alt="Frente da carta" />
                            </div>

                            <div className={styles.verso}>
                                <img src={FundoCarta} alt="Verso da Carta" />
                            </div>
                        </div>
                    )}

                </section>

                <button onClick={() => navigate('/lobby')}><IoHome /> lobby</button>
                <button onClick={() => { window.location.reload() }}><VscDebugRestart /> Restart</button>
            </main>

            {quizModal && quizAtual && (
                <QuizModal
                    pergunta={quizAtual.questao.pergunta}
                    respostas={quizAtual.respostas}
                    onResponder={verificarResposta}
                />
            )}
        </div>
    )
}