import { useState } from 'react';
import styles from './App.module.css'
import Header from './components/Header/Header'
import PageImage from './components/PageImage/PageImage';
import Intro from './components/Intro/Intro'
import FoodList from './components/FoodList/FoodList'
import CartContext from './context/cart-context';

const initialItems = [
  {
    id: 1,
    title: 'Chips',
    description: 'Fried potato',
    price: 22.99,
    quantity: 1
  },
  {
    id: 2,
    title: 'Burger',
    description: 'Yummy',
    price: 15,
    quantity: 0
  },
  {
    id: 3,
    title: 'Sandwich',
    description: 'Its a sandwich',
    price: 1,
    quantity: 0
  },
  {
    id: 4,
    title: 'Bacon',
    description: 'Sizzling',
    price: 7.5,
    quantity: 0
  }
]

function App() {
  const [items, setItems] = useState(initialItems);

  const updateItemsHandler = (id, quantity) => {
    setItems(prevItems => {
      const updatedItems = [...prevItems]
      let itemIndex = updatedItems.findIndex((item => item.id === id));
      if (!quantity || quantity < 0) {
        quantity = 0
      }
      updatedItems[itemIndex].quantity = quantity
      return updatedItems
    })
  }

  return (
    <CartContext.Provider value={{
      updateItems: updateItemsHandler,
      items: items
      }}>
      <main className={styles.Main}>
        <Header />
        <PageImage />
        <Intro />
        <FoodList />
      </main>
    </ CartContext.Provider>
  );
}

export default App;
