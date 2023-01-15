import React from "react";
import styles from "./sorting-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";


export const SortingPage: React.FC = () => {

  const initialState = {
    arr: null
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);

  function reducer(state: any, action: any) {
    switch (action.type) {
      case 'changeArray':
        console.log('changeArray');
        return {
          ...state,
          arr: action.arr
        }
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  };

  const [arr, setArr] = React.useState<any[]>([]);

  React.useEffect(() => {
    dispatch({type: 'changeArray', action: getColumns(arr)})
  }, [arr])

  function randomArr() {
    let arr = [];

    let i = Math.floor(Math.random() * (17 - 3 + 1) + 3);

    for (let j = 0; j < i; j++) {
      let num = Math.floor(Math.random() * (100 - 0 + 1) + 0);
      arr.push(num);
    };

    setArr(arr);

    return arr;
  };

  // function getColumns() {
  //   const startingArr = randomArr();

  //   const finishingArr = startingArr.map((value, i) => {
  //     return (
  //       <Column index={value} key={i}/>
  //     )
  //   });

  //   // setArr(finishingArr);

  //   return finishingArr;
  // };

  function getColumns(arr: any) {
    
    const finishingArr = arr.map((value: number, i: number) => {
      return (
        <Column index={value} key={i}/>
      )
    });

    return finishingArr;
  };

  const test = arr.map((value: number, i: number) => {
    return (
      <Column index={value} key={i}/>
    )
  });

  function changeArr() {
    console.log('azaza');
    // getColumns();
  };

  // console.log(randomArr());
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

        <Button text='Новый массив' type='button' onClick={randomArr}/>
      </form>

      <section className={styles.visualArray}>
        {/* <Column index={1}/>
        <Column index={60}/>
        <Column index={30}/> */}
        {/* {finishingArr} */}
        {/* {getColumns()} */}
        {test}

      </section>
    </SolutionLayout>
  );
};
