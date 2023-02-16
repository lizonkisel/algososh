import React from "react";
import styles from "./fibonacci-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { type } from "os";

import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {

  const [currentNum, setCurrentNum] = React.useState<string | ''>('');

  interface IInitialState {
    num: number | null,
    areCalculationsStarted: boolean,
    calculating: boolean,
    isCalculated: boolean,
  }

  const initialState: IInitialState = {
    num: null,
    areCalculationsStarted: false,
    calculating: false,
    isCalculated: false
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const [arr, setArr] = React.useState<number[]>([]);

  const {num, areCalculationsStarted, calculating, isCalculated} = state;

  React.useEffect(() => {
    if (areCalculationsStarted) {
      getFibonacciRow(num);
    }
  }, [areCalculationsStarted]);


  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let counter = count;
    setTimeout(function test() {
      if (counter < arr.length) {
        // setCount(count => count + 1); // Не понимаю, что происходит в этой строчке. 
        // Нужно разобраться с тем, как это работает, и когда происходит переопределение fibNumbers
        setCount((a) => a + 1);
        counter++;
        setTimeout(test, SHORT_DELAY_IN_MS);
      } else {
        dispatch({type: 'end'});
      }
    }, SHORT_DELAY_IN_MS);
    setCount(0);
    counter = 0;
  }, [arr]);

  React.useEffect(() => {
    if (areCalculationsStarted === true) {
      dispatch({type: 'calculating'});
    };
  }, [areCalculationsStarted]);

  let fibNumbers = arr.slice(0, count).map((value, i) => {
    return (
      <div key={i}>
        <Circle letter={value.toString()} key={i}/>
        <div>{i}</div>
      </div>
    )
  });

  function reducer(state: IInitialState, action: any) {
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
      case 'calculating':
        return {
          ...state,
          calculating: true
        }
      case 'end':
        return {
          ...state,
          areCalculationsStarted: false,
          calculating: false,
          isCalculated: true
        }
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  };

  function getFibonacciRow(n: number): number[] {
    const arr = [1, 1];
    if (n === 1) {
      return arr;
    }
    for (let i = 2; i <= n; i++) {
      const value = arr[i - 2] + arr[i - 1];
      arr.push(value);
    }
    setArr(arr);
    return arr;
  };

  function handleChange(e: React.FormEvent<HTMLInputElement>): void {
    setCurrentNum(e.currentTarget.value);
    dispatch({ type: 'set_number', value: e.currentTarget.value });
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    dispatch({type: 'start'});
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <form className={styles.inputField__wrapper} onSubmit={handleSubmit}>
        <Input isLimitText={true} max={19} min={1} extraClass={styles.inputField__input} type='number' value={currentNum} onChange={handleChange} disabled={calculating}/>

        <Button text='Развернуть' type='submit' isLoader={calculating} disabled={num === null || num < 1 || num > 19}/>
      </form>

      {
        (areCalculationsStarted || isCalculated) && 
        <section className={styles.bubbles}>
          {fibNumbers}
        </section>
      }
    </SolutionLayout>
  );
};
