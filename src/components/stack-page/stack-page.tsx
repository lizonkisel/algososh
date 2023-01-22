import React from "react";
import styles from "./stack-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import { ElementStates } from "../../types/element-states";

import { Stack } from "./stack-class";

const stack = new Stack<number | string>();

export const StackPage: React.FC = () => {

  // const stack = new Stack<number | string>();

  const [currentLetter, setCurrentLetter] = React.useState<number | string >('');
  const [currentStack, setCurrentStack] = React.useState<{letter: number | string, index: number, isTop: boolean}[]>([])

  function addToStack(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (currentLetter !== null && currentLetter !== undefined) {
      stack.push(currentLetter);
      setCurrentStack([...stack.getStack().map((value, i) => {
        return {letter: value, index: i, isTop: i + 1 === stack.getSize() ? true : false}
      })]);
    }

    setCurrentLetter('');
  };

  function deleteFromStack() {
    console.log(currentStack);
  };

  function clearStack() {
    
  };

  const renderStack = currentStack.map((value, i) => {
    return (
      <div className={styles.stackArea__stack}>
        <span className={styles.stack__top}>{value.isTop ? 'top' : ''}</span>
        <Circle letter={value.letter.toString()} key={i}/>
        <span>{value.index}</span>
      </div>
    )
  });

  return (
    <SolutionLayout title="Стек">
      <form action="" className={styles.form} onSubmit={addToStack}>
        <fieldset className={styles.form__fieldset} id='stack'>
          <Input extraClass={styles.form__input} type="text" maxLength={4} isLimitText={true} value={currentLetter} onChange={(e) => setCurrentLetter(e.currentTarget.value)}/>
          <Button extraClass={styles.form__button} text='Добавить' type='submit' name='add'/>
          <Button extraClass={styles.form__button} text='Удалить' type='button' name='delete' onClick={deleteFromStack}/>
          <Button extraClass={styles.form__button} text='Очистить' type='button' name='clear'/>
        </fieldset>

        <section className={styles.stackArea}>
          {renderStack}
        </section>
      </form>
    </SolutionLayout>
  );
};
