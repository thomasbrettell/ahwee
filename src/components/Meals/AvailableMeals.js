import React, { useCallback, useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import useHttp from '../../hooks/use-http';

const AvailableMeals = () => {
  const [mealsData, setMealsData] = useState([])

  const transformData = useCallback((data) => {
    const loadedTasks = [];

    for (const taskKey in data) {
      loadedTasks.push({
        id: taskKey,
        name: data[taskKey].name,
        description: data[taskKey].description,
        price: data[taskKey].price,
      });
    }

    setMealsData(loadedTasks);
  }, [])

  const {isLoading, error, sendRequest} = useHttp(transformData)

  if(error) {
    console.log(error)
  }

  useEffect(() => {
    sendRequest({
      url: 'https://react-http-learning-e8ee3-default-rtdb.firebaseio.com/meals.json'
    })
  }, [sendRequest])

  const mealsList = (
    <ul>
    {mealsData.map((meal) => (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ))}
    </ul>
  )

  return (
    <section className={classes.meals}>
      {isLoading
        ? <p className={classes.loading}>Loading...</p>
        : <Card>
          {mealsList}
        </Card>
      }
    </section>
  );
};

export default AvailableMeals;
