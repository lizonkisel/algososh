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
  const [currentStack, setCurrentStack] = React.useState<{letter: number | string, state: ElementStates, index: number, isTop: boolean}[]>([]);


  const initialState = { 
    sorting: false
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const { sorting } = state;

  function reducer(state: any, action: any) {
    switch (action.type) {
      case 'sorting':
        console.log('sorting');
        return {
          ...state,
          sorting: true
        }
      case 'end':
        console.log('end');
        return {
          ...state,
          sorting: false
        }
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  };

  const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

  const addToStack = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentLetter !== '' && currentLetter !== null && currentLetter !== undefined) {
      stack.push(currentLetter);
      setCurrentStack([...stack.getStack().map((value, i) => {
        return {letter: value, state: i + 1 === stack.getSize() ? ElementStates.Changing : ElementStates.Default, index: i, isTop: i + 1 === stack.getSize() ? true : false}
      })]);
    }

    await delay(500);

    setCurrentStack([...stack.getStack().map((value, i) => {
      return {letter: value, state: ElementStates.Default, index: i, isTop: i + 1 === stack.getSize() ? true : false}
    })]);

    setCurrentLetter('');
  };

  const deleteFromStack = async() => {
    setCurrentStack([...stack.getStack().map((value, i) => {
      return {letter: value, state: i + 1 === stack.getSize() ? ElementStates.Changing : ElementStates.Default, index: i, isTop: i + 1 === stack.getSize() ? true : false}
    })]);

    await delay(500);

    stack.pop();

    setCurrentStack([...stack.getStack().map((value, i) => {
      return {letter: value, state: ElementStates.Default, index: i, isTop: i + 1 === stack.getSize() ? true : false}
    })]);

    setCurrentLetter('');
  };

  function clearStack() {
    stack.clear();
    setCurrentStack([...stack.getStack().map((value, i) => {
      return {letter: value, state: ElementStates.Default, index: i, isTop: i + 1 === stack.getSize() ? true : false}
    })]);

    setCurrentLetter('');
  };

  const renderStack = currentStack.map((value, i) => {
    
    return (
      <div className={styles.stackArea__stack} key={i}>
        <span className={styles.stack__top}>{value.isTop ? 'top' : ''}</span>
        <Circle letter={value.letter.toString()} state={value.state}/>
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
          <Button extraClass={styles.form__button} text='Очистить' type='button' name='clear' onClick={clearStack}/>
        </fieldset>

        <section className={styles.stackArea}>
          {renderStack}
        </section>
      </form>
    </SolutionLayout>
  );
};
