import ProductItem from './ProductItem';
import classes from './Products.module.css';
import {useSelector} from 'react-redux'

const Products = (props) => {
  const products = useSelector(state => state.products.products)
  const isLoading = useSelector(state => state.products.isLoading)

  return (
    <>
      {!isLoading
      ? (
      <section className={classes.products}>
        <h2>Buy your favorite products</h2>
        <ul>
          {products.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
          ))}
        </ul>
      </section>
      )
      : (
      <p className={classes.loading}>Loading...</p>
      )
    }
    </>
  );
};

export default Products;
