import React from "react";
import styles from "./stack-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";

import { ElementStates } from "../../types/element-states";

import { Stack } from "./stack-class";

export const StackPage: React.FC = () => {
  return (
    <SolutionLayout title="Стек">
      <form action="" className={styles.form}>
        <fieldset className={styles.form__fieldset} id='stack'>
          <Input extraClass={styles.form__input} type = "text" maxLength={4} isLimitText={true}/>
          <Button extraClass={styles.form__button} text='Добавить' type='button' name='add'/>
          <Button extraClass={styles.form__button} text='Удалить' type='button' name='delete'/>
          <Button extraClass={styles.form__button} text='Очистить' type='button' name='clear'/>
        </fieldset>
      </form>
    </SolutionLayout>
  );
};
