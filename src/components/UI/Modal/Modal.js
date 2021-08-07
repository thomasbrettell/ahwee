import styles from './Modal.module.css'
import reactDOM from 'react-dom'

const portalRoot = document.getElementById('overlay-root')

const ModalOverlay = (props) => {
  return (
    <div className={styles.ModalOverlay}>{props.children}</div>
  )
}

const Backdrop = (props) => {
  return (
    <div className={styles.Backdrop}>
      <ModalOverlay className={props.className} children={props.children}/>
    </div>
  )
}

const Modal = (props) => {
  return (
    <>
    {reactDOM.createPortal(<Backdrop className={props.className} children={props.children} onHideModal={props.onHideModal}/>, portalRoot)}
    </>
  )
}

export default Modal