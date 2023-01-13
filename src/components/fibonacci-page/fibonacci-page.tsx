import React from "react";
import styles from "./fibonacci-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { type } from "os";

export const FibonacciPage: React.FC = () => {

  const initialState = {
    num: null,
    areCalculationsStarted: false,
    isCalculated: false
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const [arr, setArr] = React.useState<number[]>([]);

  const {num, areCalculationsStarted, isCalculated} = state;

  React.useEffect(() => {
    if (areCalculationsStarted) {
      getFibonacciRow(num);
    }
  }, [areCalculationsStarted]);


  const [count, setCount] = React.useState(0);


  // React.useEffect(() => {
  //   let counter = count;
  //   const interval = setInterval(() => {
  //     if (counter >= arr.length) {
  //       clearInterval(interval);
  //     } else {
  //       setCount(count => count + 1);
  //       counter++; // local variable that this closure will see
  //     }
  //   }, 500);
  //   return () => clearInterval(interval);
  // }, [arr]);

  React.useEffect(() => {
    console.log('count = ', count)
    let counter = count;
    setTimeout(function test() {
      if (counter < arr.length) {
        // setCount(count => count + 1); // Не понимаю, что происходит в этой строчке. 
        // Нужно разобраться с тем, как это работает, и когда происходит переопределение fibNumbers
        setCount((a) => a + 1);
        counter++;
        setTimeout(test, 500);
      }
    }, 500);
    setCount(0);
    counter = 0;
  }, [arr]);

  // let fibNumbers = 5;

  let fibNumbers = arr.slice(0, count).map((value, i) => {
    console.log('arr: ', arr)
    console.log(count);
    return (
      <div>
        <Circle letter={value.toString()} key={i}/>
        <div>{i}</div>
      </div>
    )
  });

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
          {/* {arr.map((value, i) => {
            return <Circle letter={value.toString()} key={i}/>
          })} */}
          {fibNumbers}
          {/* {showFibonacciRow()}; */}
        </section>
      }
    </SolutionLayout>
  );
};
