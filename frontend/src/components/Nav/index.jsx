
import Logo from '../../assets/imgs/logo.png'
import styles from './Nav.module.css'

export function NavBar() {
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
                            <a className="nav-link" href="#">Lobby</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Ranking</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">User</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Sair</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}