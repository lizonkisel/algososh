import React from "react";
import styles from "./string.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { START, END, CALCULATING, ADD_LETTERS } from '../../actions/index';

export const StringComponent: React.FC = () => {

  const [currentString, setCurrentString] = React.useState<string | ''>('');

  interface IInitialState {
    text: string,
    isRotateStarted: boolean,
    calculating: boolean,
    isRotated: boolean,
  }

  const initialState: IInitialState = { 
    text: '',
    isRotateStarted: false,
    calculating: false,
    isRotated: false
  };

  const [lettersState, setLettersState] = React.useState<{letter: string, state: ElementStates}[]>([]);
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    const lettersArray = state.text.split('');
    const newlettersArray = lettersArray.map((letter: string) => {
      return {letter: letter, state: ElementStates.Default}
    });
    setLettersState([...newlettersArray]);
  }, [state.text]);

  React.useEffect(() => {
    if (state.isRotateStarted) {
      dispatch({type: CALCULATING});
      reverseString(lettersState);
    }
  }, [state.isRotateStarted]);

  function reducer(state: IInitialState, action: any) {
    switch (action.type) {
      case ADD_LETTERS:
        return {
          ...state,
          text: action.value,
          isRotateStarted: false
        };
      case START:
        return {
          ...state,
          isRotateStarted: true,
        }
      case CALCULATING:
        return {
          ...state,
          calculating: true
        }
      case END:
        return {
          ...state,
          isRotateStarted: false,
          calculating: false,
          isRotated: true
        }
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  };

  function reverseString(lettersState: {letter: string, state: ElementStates}[]) {
    let copyArr = lettersState.slice(0);
    let i = 0;
    let j = copyArr.length - 1;

    if (copyArr.length === 1) {
      copyArr[0].state = ElementStates.Modified;
      setLettersState([...copyArr]);
      dispatch({type: END});
    } else {
      setTimeout(function test() {
        if (copyArr.length % 2 !== 0 && i === j) {
          copyArr[i].state = ElementStates.Modified;
          setLettersState([...copyArr]);
          dispatch({type: END});
        } else {
          let start = copyArr[i];
          let end = copyArr[j];
          let temp = null;

          start.state = ElementStates.Changing;
          end.state = ElementStates.Changing;
          setLettersState([...copyArr]);
  
          setTimeout((i: number, j: number) => {
            temp = copyArr[i];
            copyArr[i] = copyArr[j];
            copyArr[j] = temp;
            setLettersState([...copyArr]);
            
            setTimeout(() => {
              start.state = ElementStates.Modified;
              end.state = ElementStates.Modified;
              setLettersState([...copyArr]);
              if (i < j - 1) {
                setTimeout(test, DELAY_IN_MS);
              } else {
                dispatch({type: END});
              }
            }, DELAY_IN_MS, i, j)
          }, DELAY_IN_MS, i, j);
        }
        i++;
        j--;
      }, DELAY_IN_MS)
    }
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    dispatch({ type: START });
  };

  function handleChange(e: React.FormEvent<HTMLInputElement>): void {
    setCurrentString(e.currentTarget.value);
    dispatch({ type: ADD_LETTERS, value: e.currentTarget.value });
  };

  return (
    <SolutionLayout title="Строка">

      <form className={styles.inputField__wrapper} onSubmit={handleSubmit}>
        <Input isLimitText={true} maxLength={11} extraClass={styles.inputField__input} value={currentString} onChange={handleChange} disabled={state.calculating}/>
        <Button text='Развернуть' type='submit' isLoader={state.calculating} disabled={currentString === ''}/>
      </form>

      {
        (state.isRotateStarted  || state.isRotated) && 
        <section className={styles.bubbles}>
          {lettersState.map((letter: {letter: string, state: ElementStates}, i) => {
            return <Circle letter={letter.letter} state={letter.state} key={i}/>
          })}
        </section>
      }

    </SolutionLayout>
  );
};
