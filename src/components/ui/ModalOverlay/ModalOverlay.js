import ReactDOM from 'react-dom'
import styles from './ModalOverlay.module.css'

const ModalOverlay = (props) => {
  const clickHandler = (e) => {
    props.disableModal(false)
  }

  return (
    <div className={styles.ModalOverlay} onClick={clickHandler}>
      {props.children}
    </div>
  )
}

const Modal = (props) => {
  return(
    <>
    {ReactDOM.createPortal(<ModalOverlay disableModal={props.disableModal}>{props.children}</ModalOverlay>, document.getElementById('overlay-root'))}
    </>
  )
}

export default Modal