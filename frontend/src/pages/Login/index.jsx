import styles from './Login.module.css'
import Logo from '../../assets/imgs/logo.png'
import { useNavigate } from 'react-router-dom'
import { LoginUser } from '../../services/auth'
import { useState } from 'react'

export function Login() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')

    return (
        <div className={styles.container}>
            <section className={styles.areaLogin}>
                <img src={Logo} alt="Logo" className={styles.logo}/>
                <h1>Mostre que sua memória é nível SSS!</h1>

                <div class="mb-3 w-75">
                    <label for="username" class="form-label" >Nome de usuário</label>
                    <input type="text" class="form-control" id='username' onChange={(e) => setUsername(e.target?.value)}/>
                </div>
                <button onClick={() => LoginUser(username, navigate)}>Jogar</button>
            </section>
        </div>
    )
}