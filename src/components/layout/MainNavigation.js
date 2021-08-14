import styles from './MainNavigation.module.css'
import {Link, NavLink} from 'react-router-dom'

const MainNavigation = () => {
  return (
    <header className={styles.header}>
      <Link to='/' className={styles.logo}>Great Quotes</Link>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink activeClassName={styles.active} to='/quotes'>All Quotes</NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.active} to='/add-quote'>Add a Quote</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation