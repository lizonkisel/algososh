import React from "react";
import styles from "./stack-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../utils";
import { START_ADDING, END_ADDING, START_REMOVAL, END_REMOVAL, START_CLEANING, END_CLEANING} from '../../actions/index';

import { Stack } from "./stack-class";

const stack = new Stack<number | string>();

export const StackPage: React.FC = () => {

  const [currentLetter, setCurrentLetter] = React.useState<number | string >('');
  const [currentStack, setCurrentStack] = React.useState<{letter: number | string, state: ElementStates, index: number, isTop: boolean}[]>([]);

  interface IInitialState {
    adding: boolean,
    removal: boolean,
    cleaning: boolean,
  }

  const initialState: IInitialState = {
    adding: false,
    removal: false,
    cleaning: false,
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const {adding, removal, cleaning} = state;

  function reducer(state: IInitialState, action: any) {
    switch (action.type) {
      case START_ADDING:
        return {
          ...state,
          adding: true,
        };
      case END_ADDING:
        return {
          ...state,
          adding: false,
        };
      case START_REMOVAL:
        return {
          ...state,
          removal: true,
        };
      case END_REMOVAL:
        return {
          ...state,
          removal: false,
        };
      case START_CLEANING:
        return {
          ...state,
          cleaning: true,
        };
      case END_CLEANING:
        return {
          ...state,
          cleaning: false,
        };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  };

  const addToStack = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({type: START_ADDING});

    if (currentLetter !== '' && currentLetter !== null && currentLetter !== undefined) {
      stack.push(currentLetter);
      setCurrentStack([...stack.getStack().map((value, i) => {
        return {letter: value, state: i + 1 === stack.getSize() ? ElementStates.Changing : ElementStates.Default, index: i, isTop: i + 1 === stack.getSize() ? true : false}
      })]);
    }

    await delay(SHORT_DELAY_IN_MS);

    setCurrentStack([...stack.getStack().map((value, i) => {
      return {letter: value, state: ElementStates.Default, index: i, isTop: i + 1 === stack.getSize() ? true : false}
    })]);

    setCurrentLetter('');

    dispatch({type: END_ADDING});
  };

  const deleteFromStack = async() => {
    dispatch({type: START_REMOVAL});

    setCurrentStack([...stack.getStack().map((value, i) => {
      return {letter: value, state: i + 1 === stack.getSize() ? ElementStates.Changing : ElementStates.Default, index: i, isTop: i + 1 === stack.getSize() ? true : false}
    })]);

    await delay(SHORT_DELAY_IN_MS);

    stack.pop();

    setCurrentStack([...stack.getStack().map((value, i) => {
      return {letter: value, state: ElementStates.Default, index: i, isTop: i + 1 === stack.getSize() ? true : false}
    })]);

    setCurrentLetter('');

    dispatch({type: END_REMOVAL});
  };

  function clearStack() {
    dispatch({type: START_CLEANING});

    stack.clear();
    setCurrentStack([...stack.getStack().map((value, i) => {
      return {letter: value, state: ElementStates.Default, index: i, isTop: i + 1 === stack.getSize() ? true : false}
    })]);

    setCurrentLetter('');

    dispatch({type: END_CLEANING});
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
          <Button extraClass={styles.form__button} text='Добавить' type='submit' name='add' isLoader={adding} disabled={currentLetter === '' || removal || cleaning}/>
          <Button extraClass={styles.form__button} text='Удалить' type='button' name='delete' isLoader={removal} onClick={deleteFromStack} disabled={currentStack.length === 0 || adding || cleaning}/>
          <Button extraClass={styles.form__button} text='Очистить' type='button' name='clear' isLoader={cleaning} onClick={clearStack} disabled={currentStack.length === 0 || adding || removal}/>
        </fieldset>

        <section className={styles.stackArea}>
          {renderStack}
        </section>
      </form>
    </SolutionLayout>
  );
};
