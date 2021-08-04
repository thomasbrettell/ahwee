import styles from './Header.module.css'
import Wrapper from '../UI/Wrapper/Wrapper'
import Cart from '../Cart/Cart'

const Header = () => {
  return (
    <header className={styles.Header}>
      <Wrapper>
        <span className={styles.logo}>FooodAppp</span>
        <Cart />
      </Wrapper>
    </header>
  )
}

export default Header