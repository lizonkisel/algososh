import React from "react";
import styles from "./sorting-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";


export const SortingPage: React.FC = () => {

  function randomArr() {
    let arr = [];

    let i = Math.floor(Math.random() * (17 - 3 + 1) + 3);

    for (let j = 0; j < i; j++) {
      let num = Math.floor(Math.random() * (100 - 0 + 1) + 0);
      arr.push(num);
    }

    return arr;
  };

  const finishingArr = randomArr().map((value, i) => {
    return (
      <Column index={value} key={i}/>
    )
  });

  function getColumns() {
    const startingArr = randomArr();

    const finishingArr = startingArr.map((value, i) => {
      return (
        <Column index={value} key={i}/>
      )
    });

    return finishingArr;
  };

  function changeArr() {
    console.log('azaza');
    getColumns();
  };

  console.log(randomArr());
  // setInterval(randomArr, 300);

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

        <Button text='Новый массив' type='button' onClick={changeArr}/>
      </form>

      <section className={styles.visualArray}>
        {/* <Column index={1}/>
        <Column index={60}/>
        <Column index={30}/> */}
        {/* {finishingArr} */}
        {getColumns()}
      </section>
    </SolutionLayout>
  );
};
