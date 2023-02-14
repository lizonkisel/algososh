import React from "react";
import styles from "./sorting-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";

import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../utils";

export const SortingPage: React.FC = () => {

  const [sortingType, setSortingType] = React.useState<'selection' | 'bubble'>('selection'); 
  const [sortingDirection, setSortingDirection] = React.useState<'ascending' | 'descending'>(); 
  const [numbersState, setNumbersState] = React.useState<{num: number, state: ElementStates}[]>([]);

  interface IInitialState {
    sorting: boolean
  }

  const initialState: IInitialState = { 
    sorting: false
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const { sorting } = state;

  function reducer(state: IInitialState, action: any) {
    switch (action.type) {
      case 'sorting':
        return {
          ...state,
          sorting: true
        }
      case 'end':
        return {
          ...state,
          sorting: false
        }
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  };

  React.useEffect(() => {
    setRandomArr();
  }, []);

  function setRandomArr() {
    let arr = [];
    let i = Math.floor(Math.random() * (17 - 3 + 1) + 3);

    for (let j = 0; j < i; j++) {
      let num = Math.floor(Math.random() * (100 - 0 + 1) + 0);
      arr.push({num: num, state: ElementStates.Default});
    };

    setNumbersState(arr);
    return arr;
  };

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
  
  function ascendingSort() {
    dispatch({ type: 'sorting' });

    setSortingDirection('ascending');

    if (sortingType === 'selection') {
      selectionSortAscending();
    } else {
      bubbleSortAscending();
    }
  };

  function descendingSort() {
    dispatch({ type: 'sorting' });

    setSortingDirection('descending');

    if (sortingType === 'selection') {
      selectionSortDescending();
    } else {
      bubbleSortDescending();
    }
  };

  const bubbleSortAscending = async() => {
    let copyArr = numbersState.slice(0);
    for (let i = 0; i < copyArr.length - 1; i++) {
      for (let j = 0; j < copyArr.length - i - 1; j++) {
        copyArr[j].state = ElementStates.Changing;
        copyArr[j + 1].state = ElementStates.Changing;
        setNumbersState([...copyArr]);
        await delay(SHORT_DELAY_IN_MS);
        if (copyArr[j].num > copyArr[j + 1].num) {
          swap(copyArr, j, j + 1);
          copyArr[j].state = ElementStates.Default;
          copyArr[j + 1].state = ElementStates.Default;
        } else {
          copyArr[j].state = ElementStates.Default;
          copyArr[j + 1].state = ElementStates.Default;
          setNumbersState([...copyArr]);
        }
      }
      copyArr[copyArr.length - i - 1].state = ElementStates.Modified;
    }
    copyArr[0].state = ElementStates.Modified;
    setNumbersState([...copyArr]);

    dispatch({ type: 'end' });
  };

  const bubbleSortDescending = async() => {
    let copyArr = numbersState.slice(0);
    for (let i = 0; i < copyArr.length - 1; i++) {
      for (let j = 0; j < copyArr.length - i - 1; j++) {
        copyArr[j].state = ElementStates.Changing;
        copyArr[j + 1].state = ElementStates.Changing;
        setNumbersState([...copyArr]);
        await delay(SHORT_DELAY_IN_MS);
        if (copyArr[j].num < copyArr[j + 1].num) {
          swap(copyArr, j, j + 1);
          copyArr[j].state = ElementStates.Default;
          copyArr[j + 1].state = ElementStates.Default;
        } else {
          copyArr[j].state = ElementStates.Default;
          copyArr[j + 1].state = ElementStates.Default;
          setNumbersState([...copyArr]);
        }
      }
      copyArr[copyArr.length - i - 1].state = ElementStates.Modified;
    }
    copyArr[0].state = ElementStates.Modified;
    setNumbersState([...copyArr]);

    dispatch({ type: 'end' });
  };

 const selectionSortDescending = async() => {
    let copyArr = numbersState.slice(0);
    for (let i = 0; i < copyArr.length - 1; i++) {
      let maxInd = i;
      for (let j = i; j < copyArr.length - 1; j++) {
        copyArr[i].state = ElementStates.Changing;
        copyArr[j + 1].state = ElementStates.Changing;
        setNumbersState([...copyArr]);
        await delay(SHORT_DELAY_IN_MS);

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
    copyArr[copyArr.length-1].state = ElementStates.Modified;
    setNumbersState(copyArr);

    dispatch({ type: 'end' });
  };

  const selectionSortAscending = async () => {
    let copyArr = numbersState.slice(0);
    for (let i = 0; i < copyArr.length - 1; i++) {
      let minInd = i;
      for (let j = i; j < copyArr.length - 1; j++) {
        copyArr[i].state = ElementStates.Changing;
        copyArr[j + 1].state = ElementStates.Changing;
        setNumbersState([...copyArr]);
        await delay(SHORT_DELAY_IN_MS);

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
    copyArr[copyArr.length-1].state = ElementStates.Modified;
    setNumbersState(copyArr);

    dispatch({ type: 'end' });
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
          <RadioInput label='Выбор' name='typeOfSorting' value='selection' onChange={changeAlgorithm} checked={sortingType === 'selection'} disabled={sorting}/>
          <RadioInput label='Пузырёк' name='typeOfSorting' value='bubble' onChange={changeAlgorithm} checked={sortingType === 'bubble'} disabled={sorting}/>
        </fieldset>

        <fieldset className={`${styles.form__fieldset} ${styles.form__fieldset_type_button}`} id='orderOfSorting'>
          <Button extraClass={styles.form__button} text='По возрастанию' type='button' sorting={Direction.Ascending} name='orderOfSorting' onClick={ascendingSort} isLoader={sorting && sortingDirection === 'ascending'} disabled={sorting && sortingDirection === 'descending'}/>
          <Button extraClass={styles.form__button} text='По убыванию' type='button' sorting={Direction.Descending} name='orderOfSorting' onClick={descendingSort} isLoader={sorting && sortingDirection === 'descending'} disabled={sorting && sortingDirection === 'ascending'}/>
        </fieldset>

        <Button text='Новый массив' type='button' onClick={setRandomArr} disabled={sorting}/>
      </form>

      <section className={styles.visualArray}>
        {setColumns}
      </section>
    </SolutionLayout>
  );
};
