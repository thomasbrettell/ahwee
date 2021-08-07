import { useContext } from 'react'
import Wrapper from '../UI/Wrapper/Wrapper'
import FoodOption from '../FoodOption/FoodOption'
import Card from '../UI/Card/Card'
import CartContext from '../../context/cart-context'

const FoodList = () => {
  const ctx = useContext(CartContext)
  return (
    <Wrapper>
      <Card>
        {ctx.items.map(item => (
          <FoodOption
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            price={item.price}
            quantity={item.quantity}
            updateItem={ctx.updateItems}
          />
        ))}
      </Card>
    </Wrapper>
  )
}

export default FoodList