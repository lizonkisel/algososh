import React from "react";
import styles from "./string.module.css";

import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {

  // const testRef = React.useRef('');
  // React.useEffect(() => {
  //   testRef.current = lettersState;
  // }, [lettersState])

  const initialState = { 
    text: '',
    isRotateStarted: false,
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
      reverseString(lettersState);
    }
  }, [state.isRotateStarted]);

  function reducer(state: any, action: any) {
    switch (action.type) {
      case 'add_letters':
        return {
          ...state,
          text: action.value,
          isRotateStarted: false
        };
      case 'set_changing':
        return {
          
        }
      case 'set_modified':
        return {

        }
      case 'start':
        return {
          ...state,
          isRotateStarted: true,
        }
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  };

  function reverseString(lettersState: any) {
    let copyArr = lettersState.slice(0);
    let i = 0;
    let j = copyArr.length - 1;

    let intr = setInterval(function() {
      let start = copyArr[i];
      let end = copyArr[j];
      let temp = null;
      console.log(1);
      console.log(i, j);

      setTimeout((i: number, j: number) => {
        console.log(2);
        console.log(i, j);
        start.state = ElementStates.Changing;
        end.state = ElementStates.Changing;
        console.log(start);
        console.log(end);
        setLettersState([...copyArr]);

        setTimeout((i: number, j: number) => {
          console.log(3);
          console.log(i, j);
          // copyArr[i] = {letter: end.letter, state: end.state};
          // copyArr[j] = {letter: start.letter, state: start.state};
          
          temp = copyArr[i];
          copyArr[i] = copyArr[j];
          copyArr[j] = temp;
          // copyArr[i] = end;
          // copyArr[j] = start;
          console.log('change');
          console.log(start);
          console.log(end);
          console.log(copyArr);
          setLettersState([...copyArr]);
          
          setTimeout(() => {
            start.state = ElementStates.Modified;
            end.state = ElementStates.Modified;
            console.log(copyArr);
            setLettersState([...copyArr]);
          }, 1000, i, j)
        }, 1000, i, j);
      }, 1000, i, j);

      // setTimeout((i: number, j: number) => {
      //   console.log(3);
      //   console.log(copyArr);
      //   copyArr[i] = end;
      //   copyArr[j] = start;

      //   start.state = ElementStates.Modified;
      //   end.state = ElementStates.Modified;
      //   console.log(copyArr);
      //   setLettersState([...copyArr]);
      // }, 1000);

      // setTimeout((i: number, j: number) => {
      //   console.log(3);
      //   lettersState[i] = end;
      //   lettersState[j] = start;

      //   start.state = ElementStates.Modified;
      //   end.state = ElementStates.Modified;
      //   setLettersState(lettersState);
      // }, 1000);

      i++;
      j--;

      if (i >= j) clearInterval(intr);
    }, 1000)
  };

  // function reverseString(lettersState: any) {
  //   // const initialArray = initialString.split('');

  //   let i = 0;
  //   let j = lettersState.length - 1;

  //   let intr = setInterval(function() {
  //     console.log('cycle');
  //     let start = lettersState[i];
  //     let end = lettersState[j];
  //     console.log('1');
  //     start.state = ElementStates.Changing;
  //     end.state = ElementStates.Changing;
  //     console.log('2');
  //     lettersState[i] = end;
  //     lettersState[j] = start;

  //     start.state = ElementStates.Modified;
  //     end.state = ElementStates.Modified;
  //     console.log('Modified');

  //     i++;
  //     j--;
      
  //     if (i >= j) clearInterval(intr);
  //   }, 1000);

  //   // console.log('azaza');
  //   // console.log(lettersState);
  //   // return lettersState;
  // };


  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    console.log('Submit');

    // const lettersArray = state.text.split('');
    // const newlettersArray = lettersArray.map((letter: string) => {
    //   return {letter: letter, state: ElementStates.Default}
    // });

    // setLettersState([...newlettersArray]);

    dispatch({ type: 'start' });

    // reverseString(lettersState);

  };

  function handleChange(e: React.FormEvent<HTMLInputElement>): void {
    dispatch({ type: 'add_letters', value: e.currentTarget.value });
  };




  return (
    <SolutionLayout title="Строка">

      <form className={styles.inputField__wrapper} onSubmit={handleSubmit}>
        <Input isLimitText={true} maxLength={11} extraClass={styles.inputField__input} onChange={handleChange}/>
        <Button text='Развернуть' type='submit'/>
      </form>

      {
        state.isRotateStarted && 
        <section className={styles.bubbles}>
          {lettersState.map((letter: any, i) => {
            return <Circle letter={letter.letter} state={letter.state} key={i}/>
          })}
          {/* <div>{state.text}</div> */}
        </section>
      }

    </SolutionLayout>
  );
};
