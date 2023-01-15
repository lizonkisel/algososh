import React from "react";
import styles from "./sorting-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";


export const SortingPage: React.FC = () => {

  

  return (
    <SolutionLayout title="Сортировка массива">
      <form action="" className={styles.form}>
        <fieldset className={`${styles.form__fieldset} ${styles.form__fieldset_type_radio}`} id='typeOfSorting'>
          <RadioInput label='Выбор' name='typeOfSorting' checked/>
          <RadioInput label='Пузырёк' name='typeOfSorting' />
        </fieldset>

        <fieldset className={`${styles.form__fieldset} ${styles.form__fieldset_type_button}`} id='orderOfSorting'>
          <Button text='По возрастанию' type='button' sorting={Direction.Ascending} name='orderOfSorting'/>
          <Button text='По убыванию' type='button' sorting={Direction.Descending} name='orderOfSorting'/>
        </fieldset>

        <Button text='Новый массив' type='button'/>
      </form>

      <section className={styles.visualArray}>
        <Column index={1}/>
        <Column index={60}/>
        <Column index={30}/>
      </section>
    </SolutionLayout>
  );
};
