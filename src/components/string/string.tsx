import React from "react";
import styles from "./string.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: React.FC = () => {

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
      dispatch({type: 'calculating'});
      reverseString(lettersState);
    }
  }, [state.isRotateStarted]);

  function reducer(state: IInitialState, action: any) {
    switch (action.type) {
      case 'add_letters':
        return {
          ...state,
          text: action.value,
          isRotateStarted: false
        };
      case 'start':
        return {
          ...state,
          isRotateStarted: true,
        }
      case 'calculating':
        return {
          ...state,
          calculating: true
        }
      case 'end':
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
    } else {
      setTimeout(function test() {
        if (copyArr.length % 2 !== 0 && i === j) {
          copyArr[i].state = ElementStates.Modified;
          setLettersState([...copyArr]);
          dispatch({type: 'end'});
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
                dispatch({type: 'end'});
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

    dispatch({ type: 'start' });
  };

  function handleChange(e: React.FormEvent<HTMLInputElement>): void {
    dispatch({ type: 'add_letters', value: e.currentTarget.value });
  };

  return (
    <SolutionLayout title="Строка">

      <form className={styles.inputField__wrapper} onSubmit={handleSubmit}>
        <Input isLimitText={true} maxLength={11} extraClass={styles.inputField__input} onChange={handleChange} disabled={state.calculating}/>
        <Button text='Развернуть' type='submit' isLoader={state.calculating}/>
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
