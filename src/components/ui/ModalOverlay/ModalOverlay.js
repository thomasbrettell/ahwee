import { useRef } from 'react'
import ReactDOM from 'react-dom'
import styles from './ModalOverlay.module.css'

const ModalOverlay = (props) => {
  const modalRef = useRef()

  const clickHandler = (e) => {
    if (e.target === modalRef.current) {
      props.disableModal(false)
    }
  }

  return (
    <div className={styles.ModalOverlay} ref={modalRef} onClick={clickHandler}>
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