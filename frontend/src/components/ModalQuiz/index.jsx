import styles from './Modal.module.css'

export default function QuizModal({ pergunta, respostas, onResponder }) {
    return (
        <div className={styles.quizModal}>
            <div className={styles.quizContent}>
                <h2>{pergunta}</h2>
                <div className={styles.quizAlternativas}>
                    {respostas.map((alt) => (
                        <button key={alt.id} onClick={() => onResponder(alt)}>
                            {alt.descricao}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}