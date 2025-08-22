
import Logo from '../../assets/imgs/logo.png'
import styles from './Nav.module.css'
import { IoHome } from "react-icons/io5";
import { FaRankingStar } from "react-icons/fa6";
import { FaLevelUpAlt, FaUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

export function NavBar() {
    const navigate = useNavigate()

    return (
        <nav className="navbar navbar-expand-lg navbar-light nav-principal">

                
                
            <div className="container-fluid area-nav-list justify-content-between align-items-center">
                <img src={Logo} alt="logo" className={styles.logo}/>

                <button className="navbar-toggler bg-warning" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end align-items-center" id="navbarNav">
                    <ul className="navbar-nav gap-3">
                        <li className="nav-item">
                            <a className="nav-link" onClick={() => navigate('/lobby')}><IoHome/> Lobby</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={() => navigate('/ranking')}><FaRankingStar/> Ranking</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"><FaUser/> User</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={() => {
                                navigate('/')
                            }}><CiLogout/> Sair</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}