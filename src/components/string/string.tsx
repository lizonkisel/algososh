import React from "react";
import styles from "./string.module.css";

import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const StringComponent: React.FC = () => {

  const [text, setText] = React.useState('');

  const initialState = { 
    text: '',
    isRotateStarted: false,
    isRotated: false
  };

  function reducer(state: any, action: any) {
    switch (action.type) {
      case 'start':
        return {
          ...state,
          text: text,
          isRotateStarted: true,
        }
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  const [state, dispatch] = React.useReducer(reducer, initialState);


  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    console.log('Submit');

    dispatch({ type: 'start' });

    // text.split('').map((element) => {
    //   return <Circle letter={element}/>
    // });

  };

  function handleChange(e: React.FormEvent<HTMLInputElement>): void {
    setText(e.currentTarget.value);
    console.log(text);
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
          <div>Let's start</div>
        </section>
      }
        
      {/* <section className={styles.bubbles}>

      </section> */}

    </SolutionLayout>
  );
};
