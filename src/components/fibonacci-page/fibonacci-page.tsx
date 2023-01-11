import React from "react";
import styles from "./fibonacci-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {

  const initialState = {
    num: null,
    areCalculationsStarted: false,
    isCalculated: false
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const {num, areCalculationsStarted, isCalculated} = state;

  function reducer(state: any, action: any) {
    switch (action.type) {
      case 'set_number':
        return {
          ...state,
          num: action.value,
          areCalculationsStarted: false
        };
      case 'start':
        return {
          ...state,
          areCalculationsStarted: true,
        }
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  };

  function getFibonacciRow(n: number): number[] {
    console.log(num);
    console.log(n);
    const arr = [1, 1];
    console.log('azaza');
    if (n === 1) {
      return arr;
    }
    for (let i = 2; i <= n; i++) {
      console.log(i);
      console.log(n);
      const value = arr[i - 2] + arr[i - 1];
      arr.push(value);
      console.log(i);
    }
    console.log(arr);
    return arr;
  };

  function handleChange(e: React.FormEvent<HTMLInputElement>): void {
    dispatch({ type: 'set_number', value: e.currentTarget.value });
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    console.log('Submit');

    dispatch({type: 'start'});
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <form className={styles.inputField__wrapper} onSubmit={handleSubmit}>
        <Input isLimitText={true} max={19} min={1} extraClass={styles.inputField__input} type='number' onChange={handleChange}/>
        <Button text='Развернуть' type='submit'/>
      </form>

      {
        areCalculationsStarted && 
        <section className={styles.bubbles}>
          {getFibonacciRow(num).map((value, i) => {
            return <Circle letter={value.toString()} key={i}/>
          })}
        </section>
      }
    </SolutionLayout>
  );
};
