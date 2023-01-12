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
    let counter = count;
    setTimeout(function test() {
      if (counter < arr.length) {
        setCount(count => count + 1);
        counter++; // local variable that this closure will see
        console.log(count);
        setTimeout(test, 500);
      }
    }, 500);
  }, [arr]);

  let playersDraftedList = arr.slice(0, count).map((value, i) => {
    return (
      <Circle letter={value.toString()} key={i}/>
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

  function showFibonacciRow() {
    setTimeout(function test() {
      const fibonacciArray = getFibonacciRow(num);
      let i = 0;

      if (i <= fibonacciArray.length) {
        return <Circle letter={fibonacciArray[i].toString()} key={i}/>
      }
      i++;
      setTimeout(test, 500);

      // const value = fibonacciArray[i];
      // console.log('number');
      // return <Circle letter={value.toString()} key={i}/>
      // i++;
      // if (i <= fibonacciArray.length) {
      //   setTimeout(test, 500);
      // }
    })
    // const fibonacciArray = getFibonacciRow(num);
    // // for (let i = 0; i < fibonacciArray.length; i++) {
    // //   const value = fibonacciArray[i];
    // //   setTimeout(() => {
    // //     console.log('number');
    // //     return <Circle letter={value.toString()} key={i}/>
    // //   }, 500)
    // // }
    // fibonacciArray.map((value, i) => {
    //   setTimeout(() => {
    //     console.log('number');
    //     return <Circle letter={value.toString()} key={i}/>
    //   }, 500)
    // })
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
          {playersDraftedList}
          {/* {showFibonacciRow()}; */}
        </section>
      }
    </SolutionLayout>
  );
};
