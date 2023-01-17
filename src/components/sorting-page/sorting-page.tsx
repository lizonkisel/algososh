import React from "react";
import styles from "./sorting-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";

import { ElementStates } from "../../types/element-states";


export const SortingPage: React.FC = () => {

  // type TSortingTypes = {
  //   sortingType: 'selection' | 'bubble'
  // };

  const [arr, setArr] = React.useState<any[]>([]);
  const [sortingType, setSortingType] = React.useState<'selection' | 'bubble'>('selection'); 
  // const [sortingType, setSortingType] = React.useState<string>('selection'); // Разобраться, как сделать так, чтобы работала верхняя строчка
  const [numbersState, setNumbersState] = React.useState<{num: number, state: ElementStates}[]>([]);

  const initialState = { 
    isSortingStarted: false,
    sorting: false,
    isSorted: false
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const {isSortingStarted, sorting, isSorted} = state;

  function reducer(state: any, action: any) {
    switch (action.type) {
      case 'start':
        console.log('start');
        return {
          ...state,
          isSortingStarted: true,
        }
      case 'sorting':
        console.log('sorting');
        return {
          ...state,
          sorting: true
        }
      case 'end':
        console.log('end');
        return {
          ...state,
          isSortingStarted: false,
          sorting: false,
          isSorted: true
        }
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  };


  React.useEffect(() => {
    const newNumbersArray = arr.map((num: number) => {
      return {num: num, state: ElementStates.Default}
    });
    setNumbersState([...newNumbersArray]);
  }, []);




  function setRandomArr() {
    let arr = [];
    let i = Math.floor(Math.random() * (17 - 3 + 1) + 3);

    for (let j = 0; j < i; j++) {
      let num = Math.floor(Math.random() * (100 - 0 + 1) + 0);
      // arr.push(num);
      arr.push({num: num, state: ElementStates.Default});
    };

    // setArr(arr);
    setNumbersState(arr);
    console.log(arr);
    return arr;
  };

  // const setColumns = arr.map((value: number, i: number) => {
  const setColumns = numbersState.map((value, i) => {
    return (
      <Column index={value.num} state={value.state} key={i}/>
    )
  });

  const swap = (arr: {num: number, state: ElementStates}[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

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
    let copyArr = numbersState.slice(0);
    for (let i = 0; i < copyArr.length - 1; i++) {
      for (let j = 0; j < copyArr.length - i - 1; j++) {
        setTimeout(function start() {
          copyArr[j].state = ElementStates.Changing;
          copyArr[j + 1].state = ElementStates.Changing;
          setNumbersState([...copyArr]);
          setTimeout(() => {
            if (copyArr[j].num > copyArr[j + 1].num) {
              setTimeout(() => {
                console.log(j);
                swap(copyArr, j, j + 1);
                setNumbersState([...copyArr]);
              }, 1000)
            } else {
              setTimeout(() => {
                copyArr[j].state = ElementStates.Default;
                copyArr[j + 1].state = ElementStates.Default;
                setNumbersState([...copyArr]);
              }, 1000)
            }
          }, 1000)
          setTimeout(start, 1000);
        }, 1000)
      }
    }
    // setArr(copyArr);
    setNumbersState([...copyArr]);
  };

  function bubbleSortDescending() {
    let copyArr = numbersState.slice(0);
    for (let i = 0; i < copyArr.length - 1; i++) {
      for (let j = 0; j < copyArr.length - i - 1; j++) {
        if (copyArr[j].num < copyArr[j + 1].num) {
          swap(copyArr, j, j + 1);
        }
      }
    }
    // setArr(copyArr);
    setNumbersState([...copyArr]);
  };

 const selectionSortDescending = async() => {
    let copyArr = numbersState.slice(0);
    for (let i = 0; i < copyArr.length - 1; i++) {
      let maxInd = i;
      for (let j = i; j < copyArr.length - 1; j++) {
        copyArr[i].state = ElementStates.Changing;
        copyArr[j + 1].state = ElementStates.Changing;
        setNumbersState([...copyArr]);
        await delay(500);

        if (copyArr[maxInd].num < copyArr[j+1].num) {
          maxInd = j + 1;
        }
        copyArr[j+1].state = ElementStates.Default;
        setNumbersState([...copyArr]);
      }
      swap(copyArr, i, maxInd);
      copyArr[maxInd].state = ElementStates.Default;
      copyArr[i].state = ElementStates.Modified;
    };
    // setArr(copyArr);
    copyArr[copyArr.length-1].state = ElementStates.Modified;
    setNumbersState(copyArr);
  };

  const selectionSortAscending = async () => {
    let copyArr = numbersState.slice(0);
    for (let i = 0; i < copyArr.length - 1; i++) {
      let minInd = i;
      for (let j = i; j < copyArr.length - 1; j++) {
        copyArr[i].state = ElementStates.Changing;
        copyArr[j + 1].state = ElementStates.Changing;
        setNumbersState([...copyArr]);
        await delay(500);

        if (copyArr[minInd].num > copyArr[j+1].num) {
          minInd = j + 1;
        }
        copyArr[j+1].state = ElementStates.Default;
        setNumbersState([...copyArr]);
      }
      swap(copyArr, i, minInd);
      copyArr[minInd].state = ElementStates.Default;
      copyArr[i].state = ElementStates.Modified;
    }
    // setArr(copyArr);
    copyArr[copyArr.length-1].state = ElementStates.Modified;
    setNumbersState(copyArr);
  };

  function changeAlgorithm(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.value === 'selection' || e.currentTarget.value === 'bubble') {
      setSortingType(e.currentTarget.value);
    }
  };

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
