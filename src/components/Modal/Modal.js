import Card from '../ui/Card/Card'

const Modal = (props) => {
  return (
    <Card modal>
      {props.message}
    </Card>
  )
}

export default Modal