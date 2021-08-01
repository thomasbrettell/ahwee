import ModalOverlay from '../ui/ModalOverlay/ModalOverlay'
import styles from './Modal.module.css'

const Modal = () => {
  return (
    <ModalOverlay>
      <div className={styles.Modal}></div>
    </ModalOverlay>
  )
}

export default Modal