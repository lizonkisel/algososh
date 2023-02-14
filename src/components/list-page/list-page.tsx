import React from "react";
import styles from "./list-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";

import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../utils";

import { CircleProps } from "../ui/circle/circle";

import { LinkedList } from "./list-class";

const list = new LinkedList<number | string>();

export const ListPage: React.FC = () => {

  const [currentLetter, setCurrentLetter] = React.useState<number | string >('');
  const [currentIndex, setCurrentIndex] = React.useState<number | ''>('');
  const [currentList, setCurrentList] = React.useState<{
    elem_value: string | number, 
    state: ElementStates, 
    index: number,
    isTopElement: React.ReactElement<CircleProps> | string,
    isBottomElement: React.ReactElement<CircleProps> | string,
    isHead: boolean, 
    isTail: boolean,
  }[]>([]);

  interface IInitialState {
    animationIsWorking: boolean
  }

  const initialState: IInitialState = { 
    animationIsWorking: false
  };

  const [buttonsState, dispatch] = React.useReducer(reducer, initialState);

  const {animationIsWorking} = buttonsState;

  function reducer(state: IInitialState, action: any) {
    switch (action.type) {
      case 'start':
        return {
          ...state,
          animationIsWorking: true
        }
      case 'end':
        return {
          ...state,
          animationIsWorking: false
        }
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  };

  function createStartList() {
    list.append(0);
    list.append(34);
    list.append(8);
    list.append(1);

    setCurrentList([...list.getArray().map((value, i) => {
      return {
        elem_value: value, 
        state: ElementStates.Default, 
        index: i,
        isTopElement: '',
        isBottomElement: '',
        isHead: i === 0 ? true : false, 
        isTail: i === list.getSize() - 1 ? true : false
      }
    })]);
  };

  React.useEffect(() => {
    createStartList();
  }, []);

  const renderList = currentList.map((value, i) => {
    return (
      <div className={styles.listArea__list} key={i}>
        <Circle 
          letter={value.elem_value.toString()} 
          state={value.state} 
          index={i}
          head={value.isHead ? 'head' : value.isTopElement} 
          tail={value.isTail ? 'tail' : value.isBottomElement}  
        />
        { i !== list.getSize() - 1 && <ArrowIcon /> }
          
      </div>
    )
  });

  const addToHead = async() => {
    if (currentLetter !== '' && currentLetter !== null && currentLetter !== undefined) {

      dispatch({type: 'start'});

      setCurrentList([...list.getArray().map((value, i) => {
        return {
          elem_value: value, 
          state: ElementStates.Default, 
          index: i, 
          isTopElement: i === 0 ? <Circle state={ElementStates.Changing} letter={currentLetter.toString()} isSmall={true} /> : '', 
          isBottomElement: '',
          isHead: false, 
          isTail: i === list.getSize() - 1 ? true : false
        }
      })]);

      await delay(SHORT_DELAY_IN_MS);

      list.prepend(currentLetter);
      
      setCurrentList([...list.getArray().map((value, i) => {
        return {
          elem_value: value, 
          state: i === 0 ? ElementStates.Modified : ElementStates.Default, 
          index: i,
          isTopElement: '',
          isBottomElement: '',
          isHead: i === 0 ? true : false, 
          isTail: i === list.getSize() - 1 ? true : false
        }
      })]);

      await delay(SHORT_DELAY_IN_MS);
      
      setCurrentList([...list.getArray().map((value, i) => {
        return {
          elem_value: value, 
          state: ElementStates.Default, 
          index: i, 
          isTopElement: '',
          isBottomElement: '',
          isHead: i === 0 ? true : false, 
          isTail: i === list.getSize() - 1 ? true : false
        }
      })]);

      setCurrentLetter('');

      dispatch({type: 'end'});
    }
  };

  const addToTail = async() => {
    if (currentLetter !== '' && currentLetter !== null && currentLetter !== undefined) {

      dispatch({type: 'start'});

      setCurrentList([...list.getArray().map((value, i) => {
        return {
          elem_value: value, 
          state: ElementStates.Default, 
          index: i, 
          isTopElement: i === list.getSize() - 1 ? <Circle state={ElementStates.Changing} letter={currentLetter.toString()} isSmall={true} /> : '', 
          isBottomElement: '',
          isHead: false, 
          isTail: i === list.getSize() - 1 ? true : false
        }
      })]);

      await delay(SHORT_DELAY_IN_MS);

      list.append(currentLetter);

      setCurrentList([...list.getArray().map((value, i) => {
        return {
          elem_value: value, 
          state: i === list.getSize() - 1 ? ElementStates.Modified : ElementStates.Default, 
          index: i,
          isTopElement: '',
          isBottomElement: '',
          isHead: i === 0 ? true : false, 
          isTail: i === list.getSize() - 1 ? true : false
        }
      })]);

      await delay(SHORT_DELAY_IN_MS);

      setCurrentList([...list.getArray().map((value, i) => {
        return {
          elem_value: value, 
          state: ElementStates.Default, 
          index: i,
          isTopElement: '',
          isBottomElement: '',
          isHead: i === 0 ? true : false, 
          isTail: i === list.getSize() - 1 ? true : false
        }
      })]);

      setCurrentLetter('');

      dispatch({type: 'end'});
    }
  };

  const deleteFromHead = async() => {

    dispatch({type: 'start'});

    setCurrentList([...list.getArray().map((value, i) => {
      return {
        elem_value: i === 0 ? '' : value, 
        state: ElementStates.Default, 
        index: i, 
        isTopElement: '',
        isBottomElement: i === 0 ? <Circle state={ElementStates.Changing} letter={value.toString()} isSmall={true} /> : '', 
        isHead: i === 0 ? true : false, 
        isTail: false
      }
    })]);

    await delay(SHORT_DELAY_IN_MS);

    list.deleteHead();

    await delay(SHORT_DELAY_IN_MS);

    setCurrentList([...list.getArray().map((value, i) => {
      return {
        elem_value: value, 
        state: ElementStates.Default, 
        index: i,
        isTopElement: '',
        isBottomElement: '',
        isHead: i === 0 ? true : false, 
        isTail: i === list.getSize() - 1 ? true : false
      }
    })]);

    dispatch({type: 'end'});
  };

  const deleteFromTail = async() => {

    dispatch({type: 'start'});

    setCurrentList([...list.getArray().map((value, i) => {
      return {
        elem_value: i === list.getSize() - 1 ? '' : value, 
        state: ElementStates.Default, 
        index: i, 
        isTopElement: '',
        isBottomElement: i === list.getSize() - 1 ? <Circle state={ElementStates.Changing} letter={value.toString()} isSmall={true} /> : '', 
        isHead: i === 0 ? true : false, 
        isTail: false
      }
    })]);

    await delay(SHORT_DELAY_IN_MS);

    list.deleteTail();

    await delay(SHORT_DELAY_IN_MS);

    setCurrentList([...list.getArray().map((value, i) => {
      return {
        elem_value: value,
        state: ElementStates.Default, 
        index: i,
        isTopElement: '',
        isBottomElement: '',
        isHead: i === 0 ? true : false, 
        isTail: i === list.getSize() - 1 ? true : false
      }
    })]);

    dispatch({type: 'end'});
  };

  const addByIndex = async() => {
    if (currentIndex !== '' && currentIndex !== undefined) {

      dispatch({type: 'start'});

      if (currentIndex > list.getSize()) {
        console.log('Enter a valid index');
        dispatch({type: 'end'});
        return;
      }

      for (let j = 0; j <= currentIndex; j++) {
        setCurrentList([...list.getArray().map((value, i) => {
          return {
            elem_value: value, 
            state: j === i ? ElementStates.Changing : ElementStates.Default,  
            index: i,
            isTopElement: (j === i && i <= currentIndex) ? <Circle state={ElementStates.Changing} letter={currentLetter.toString()} isSmall={true} /> : '',
            isBottomElement: '',
            isHead: (i === 0 && j !== i) ? true : false,
            isTail: i === list.getSize() - 1 ? true : false
          }
        })])
        await delay(SHORT_DELAY_IN_MS);
      }

      list.insertByIndex(currentLetter, Number(currentIndex));

      setCurrentList([...list.getArray().map((value, i) => {
        return {
          elem_value: value, 
          state: i === Number(currentIndex) ? ElementStates.Modified : ElementStates.Default, 
          index: i,
          isTopElement: '',
          isBottomElement: '',
          isHead: i === 0 ? true : false, 
          isTail: i === list.getSize() - 1 ? true : false
        }
      })]);

      await delay(SHORT_DELAY_IN_MS);

      setCurrentList([...list.getArray().map((value, i) => {
        return {
          elem_value: value, 
          state: ElementStates.Default, 
          index: i,
          isTopElement: '',
          isBottomElement: '',
          isHead: i === 0 ? true : false, 
          isTail: i === list.getSize() - 1 ? true : false
        }
      })]);

      setCurrentLetter('');
      setCurrentIndex('');

      dispatch({type: 'end'});
    }
  };

  const deleteByIndex = async() => {

    if (currentIndex !== '' && currentIndex !== undefined) {

      dispatch({type: 'start'});

      if (currentIndex >= list.getSize()) {
        console.log('Enter a valid index');
        dispatch({type: 'end'});
        return;
      }

      for (let j = 0; j <= currentIndex; j++) {
        setCurrentList([...list.getArray().map((value, i) => {
          return {
            elem_value: j === Number(currentIndex) && j === i ? '' : value, 
            state: j === i ? ElementStates.Changing : ElementStates.Default,  
            index: i,
            isTopElement: '',
            isBottomElement: (j === Number(currentIndex) && j === i) ? <Circle state={ElementStates.Changing} letter={value.toString()} isSmall={true} /> : '',
            isHead: i === 0 ? true : false,
            isTail: (i === list.getSize() - 1 && j !== Number(currentIndex)) ? true : false
          }
        })])
        await delay(SHORT_DELAY_IN_MS);
      }

      list.deleteByIndex(Number(currentIndex));

      await delay(SHORT_DELAY_IN_MS);

      setCurrentList([...list.getArray().map((value, i) => {
        return {
          elem_value: value, 
          state: ElementStates.Default, 
          index: i,
          isTopElement: '',
          isBottomElement: '',
          isHead: i === 0 ? true : false, 
          isTail: i === list.getSize() - 1 ? true : false
        }
      })]);

      setCurrentLetter('');
      setCurrentIndex('');

      dispatch({type: 'end'});
    }
  };

  function handleChange(e: any) {
    setCurrentIndex(e.currentTarget.value);
  }

  return (
    <SolutionLayout title="Связный список">
      <form action="" className={styles.form}>
        <fieldset className={styles.form__fieldset} id='list_to_head_or_tail'>
          <Input extraClass={styles.form__input} placeholder='Введите значение' type="text" maxLength={4} isLimitText={true} value={currentLetter} onChange={(e) => setCurrentLetter(e.currentTarget.value)}/>
          <Button extraClass={styles.form__button_size_small} text='Добавить в head' type='button' name='add_to_head' onClick={addToHead} disabled={currentLetter === '' || animationIsWorking}/>
          <Button extraClass={styles.form__button_size_small} text='Добавить в tail' type='button' name='add_to_tail' onClick={addToTail} disabled={currentLetter === ''|| animationIsWorking}/>
          <Button extraClass={styles.form__button_size_small} text='Удалить из head' type='button' name='delete_from_head' onClick={deleteFromHead} disabled={animationIsWorking}/>
          <Button extraClass={styles.form__button_size_small} text='Удалить из tail' type='button' name='delete_from_tail' onClick={deleteFromTail} disabled={animationIsWorking}/>
        </fieldset>

        <fieldset className={styles.form__fieldset} id='list_by_index'>
          <Input extraClass={styles.form__input} placeholder='Введите индекс' type="number" min={0} max={currentList.length} value={currentIndex} onChange={handleChange}/>
          <Button extraClass={styles.form__button_size_large} text='Добавить по индексу' type='button' name='add_by_index' onClick={addByIndex} disabled={currentLetter === '' || currentIndex === '' || animationIsWorking}/>
          <Button extraClass={styles.form__button_size_large} text='Удалить по индексу' type='button' name='delete_by_index' onClick={deleteByIndex} disabled={currentIndex === '' || animationIsWorking}/>
        </fieldset>

        <section className={styles.listArea}>
          {renderList}
        </section>
      </form>
    </SolutionLayout>
  );
};
