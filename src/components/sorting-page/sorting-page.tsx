import React from "react";
import styles from "./sorting-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";


export const SortingPage: React.FC = () => {

  const [arr, setArr] = React.useState<any[]>([]);

  function setRandomArr() {
    let arr = [];

    let i = Math.floor(Math.random() * (17 - 3 + 1) + 3);

    for (let j = 0; j < i; j++) {
      let num = Math.floor(Math.random() * (100 - 0 + 1) + 0);
      arr.push(num);
    };

    setArr(arr);

    console.log(arr);
    return arr;
  };

  const setColumns = arr.map((value: number, i: number) => {
    return (
      <Column index={value} key={i}/>
    )
  });

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

        <Button text='Новый массив' type='button' onClick={setRandomArr}/>
      </form>

      <section className={styles.visualArray}>
        {setColumns}
      </section>
    </SolutionLayout>
  );
};
