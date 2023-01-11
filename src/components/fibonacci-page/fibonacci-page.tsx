import React from "react";
import styles from "./fibonacci-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";

export const FibonacciPage: React.FC = () => {

  const initialState = {
    isRotateStarted: false,
    isRotated: false
  };

  function getFibonacciRow(n: number): number[] {
    const arr = [1, 1];
    console.log('azaza');
    if (n === 1) {
      return arr;
    }
    for (let i = 2; i < n + 1; i++) {
      const value = arr[i - 2] + arr[i - 1];
      arr.push(value);
    }
    return arr;
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    console.log('Submit');
  };

  console.log(getFibonacciRow(1));


  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <form className={styles.inputField__wrapper} onSubmit={handleSubmit}>
        <Input isLimitText={true} max={19} min={1} extraClass={styles.inputField__input} type='number'/>
        <Button text='Развернуть' type='submit'/>
      </form>
    </SolutionLayout>
  );
};
