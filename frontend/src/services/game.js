import api from "./api";

export async function getCartas(anime) {
    try {
        const response = await api.get(`/cartas/?anime=${anime}`)
        console.log(response.data)
        return response.data
    } catch (error) {
        if (error.response) {
            return console.log(error.response.data)
        }

        return console.log(error)
    }
}

export async function getAnimes(setData) {
    try {
        const response = await api.get('/animes/')
        console.log(response.data)
        setData(response.data)
    } catch (error) {
        if (error.response) {
            return console.log(error.response.data)
        }

        return console.log(error)
    }
}

export async function getPergunta(anime, dfc, setPerguntas) {
    try {
        const response = await api.get(`/pergunta/?anime=${anime}&dificuldade=${dfc}`)
        console.log(response.data.perguntas)
        setPerguntas(response.data.perguntas)
    } catch (error) {
        if (error.response) {
            return console.log(error.response.data)
        }

        return console.log(error)
    }
}

export async function postJogo(anime, qtd_jogadas, qtd_quiz, tempo, dificuldade) {
    const user = localStorage.getItem('userId')
    if (!user) {
        return alert('Voce precisa informar um usuário.')
    }


    try {
        const response = await api.post('/criar-jogo/', {
            usuario: user,
            anime: anime, 
            qtd_jogadas: qtd_jogadas, 
            qtd_quiz: qtd_quiz, 
            tempo: tempo, 
            dificuldade: dificuldade,
        })

        console.log(response.data)
    } catch (error) {
        if (error.response) {
            return console.log(error.response.data)
        }

        return console.log(error)
    }
}