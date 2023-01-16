import React from "react";
import styles from "./sorting-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";


export const SortingPage: React.FC = () => {

  // type TSortingTypes = {
  //   sortingType: 'selection' | 'bubble'
  // };

  const [arr, setArr] = React.useState<any[]>([]);
  const [sortingType, setSortingType] = React.useState<'selection' | 'bubble'>('selection'); 
  // const [sortingType, setSortingType] = React.useState<string>('selection'); // Разобраться, как сделать так, чтобы работала верхняя строчка

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

  const swap = (arr: number[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
    console.log(arr);
  };

  function ascendingSort() {
    if (sortingType === 'selection') {
      selectionSortAscending();
    } else {
      bubbleSortAscending();
    }
  };

  function descendingSort() {
    if (sortingType === 'selection') {
      selectionSortDescending();
    } else {
      bubbleSortDescending();
    }
  };

  function bubbleSortAscending() {
    let copyArr = arr.slice(0);
    for (let i = 0; i < copyArr.length - 1; i++) {
      for (let j = 0; j < copyArr.length - i - 1; j++) {
        if (copyArr[j] < copyArr[j + 1]) {
          swap(copyArr, j, j + 1);
        }
      }
    }
    setArr(copyArr);
  };

  function bubbleSortDescending() {
    let copyArr = arr.slice(0);
    for (let i = 0; i < copyArr.length - 1; i++) {
      for (let j = 0; j < copyArr.length - i - 1; j++) {
        if (copyArr[j] > copyArr[j + 1]) {
          swap(copyArr, j, j + 1);
        }
      }
    }
    setArr(copyArr);
  };

  function selectionSortDescending() {
    let copyArr = arr.slice(0);
    for (let i = 0; i < copyArr.length - 1; i++) {
      let maxInd = i;
      for (let j = i; j < copyArr.length - 1; j++) {
        if (copyArr[maxInd] < copyArr[j+1]) {
          maxInd = j + 1;
        }
      }
      swap(copyArr, i, maxInd);
    };
    setArr(copyArr);
  };

  function selectionSortAscending() {
    let copyArr = arr.slice(0);
    for (let i = 0; i < copyArr.length - 1; i++) {
      let minInd = i;
      for (let j = i; j < copyArr.length - 1; j++) {
        if (copyArr[minInd] > copyArr[j+1]) {
          minInd = j + 1;
        }
      }
      swap(copyArr, i, minInd);
    }
    setArr(copyArr);
  };

  function changeAlgorithm(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.value === 'selection' || e.currentTarget.value === 'bubble') {
      setSortingType(e.currentTarget.value);
    }
  };

  // React.useEffect(() => {
  //   console.log('azaza');
  //   console.log(arr);
  // }, [arr]);

  return (
    <SolutionLayout title="Сортировка массива">
      <form action="" className={styles.form}>
        <fieldset className={`${styles.form__fieldset} ${styles.form__fieldset_type_radio}`} id='typeOfSorting'>
          <RadioInput label='Выбор' name='typeOfSorting' value='selection' onChange={changeAlgorithm} checked={sortingType === 'selection'} />
          <RadioInput label='Пузырёк' name='typeOfSorting' value='bubble' onChange={changeAlgorithm} checked={sortingType === 'bubble'} />
        </fieldset>

        <fieldset className={`${styles.form__fieldset} ${styles.form__fieldset_type_button}`} id='orderOfSorting'>
          <Button text='По возрастанию' type='button' sorting={Direction.Ascending} name='orderOfSorting' onClick={ascendingSort}/>
          <Button text='По убыванию' type='button' sorting={Direction.Descending} name='orderOfSorting' onClick={descendingSort}/>
        </fieldset>

        <Button text='Новый массив' type='button' onClick={setRandomArr}/>
      </form>

      <section className={styles.visualArray}>
        {setColumns}
      </section>
    </SolutionLayout>
  );
};
