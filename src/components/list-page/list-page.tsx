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
    animationIsWorking: boolean,

    addingToHead: boolean,
    addingToTail: boolean,
    removalFromHead: boolean,
    removalFromTail: boolean,
    addingByIndex: boolean,
    removalByIndex: boolean,
  }

  const initialState: IInitialState = {
    animationIsWorking: false,

    addingToHead: false,
    addingToTail: false,
    removalFromHead: false,
    removalFromTail: false,
    addingByIndex: false,
    removalByIndex: false,
  };

  const [buttonsState, dispatch] = React.useReducer(reducer, initialState);

  const {animationIsWorking, addingToHead, addingToTail, removalFromHead, removalFromTail, addingByIndex, removalByIndex} = buttonsState;

  function reducer(state: IInitialState, action: any) {
    switch (action.type) {
      case 'start_animation':
        return {
          ...state,
          animationIsWorking: true
        }
      case 'end_animation':
        return {
          ...state,
          animationIsWorking: false
        }
      case 'start_adding_to_head':
        return {
          ...state,
          addingToHead: true
        }
      case 'end_adding_to_head':
        return {
          ...state,
          addingToHead: false
        }
      case 'start_adding_to_tail':
        return {
          ...state,
          addingToTail: true
        }
      case 'end_adding_to_tail':
        return {
          ...state,
          addingToTail: false
        }
      case 'start_removal_from_head':
        return {
          ...state,
          removalFromHead: true
        }
      case 'end_removal_from_head':
        return {
          ...state,
          removalFromHead: false
        }
      case 'start_removal_from_tail':
        return {
          ...state,
          removalFromTail: true
        }
      case 'end_removal_from_tail':
        return {
          ...state,
          removalFromTail: false
        }
      case 'start_adding_by_index':
        return {
          ...state,
          addingByIndex: true
        }
      case 'end_adding_by_index':
        return {
          ...state,
          addingByIndex: false
        }
      case 'start_removal_by_index':
        return {
          ...state,
          removalByIndex: true
        }
      case 'end_removal_by_index':
        return {
          ...state,
          removalByIndex: false
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
    dispatch({type: 'start_adding_to_head'});

    if (currentLetter !== '' && currentLetter !== null && currentLetter !== undefined) {

      dispatch({type: 'start_animation'});

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

      dispatch({type: 'end_animation'});
      dispatch({type: 'end_adding_to_head'});
    }
  };

  const addToTail = async() => {
    dispatch({type: 'start_adding_to_tail'});

    if (currentLetter !== '' && currentLetter !== null && currentLetter !== undefined) {

      dispatch({type: 'start_animation'});

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

      dispatch({type: 'end_animation'});
      dispatch({type: 'end_adding_to_tail'});
    }
  };

  const deleteFromHead = async() => {
    dispatch({type: 'start_removal_from_head'});
    dispatch({type: 'start_animation'});

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

    dispatch({type: 'end_animation'});
    dispatch({type: 'end_removal_from_head'});
  };

  const deleteFromTail = async() => {
    dispatch({type: 'start_removal_from_tail'});
    dispatch({type: 'start_animation'});

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

    dispatch({type: 'end_animation'});
    dispatch({type: 'end_removal_from_tail'});
  };

  const addByIndex = async() => {

    if (currentIndex !== '' && currentIndex !== undefined) {
      dispatch({type: 'start_adding_by_index'});
      dispatch({type: 'start_animation'});

      if (currentIndex > list.getSize()) {
        console.log('Enter a valid index');
        dispatch({type: 'end_animation'});
        dispatch({type: 'end_adding_by_index'});
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

      dispatch({type: 'end_animation'});
      dispatch({type: 'end_adding_by_index'});
    }
  };

  const deleteByIndex = async() => {
    if (currentIndex !== '' && currentIndex !== undefined) {

      dispatch({type: 'start_animation'});
      dispatch({type: 'start_removal_by_index'});

      if (currentIndex >= list.getSize()) {
        console.log('Enter a valid index');
        dispatch({type: 'end_removal_by_index'});
        dispatch({type: 'end_animation'});
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

      dispatch({type: 'end_animation'});
      dispatch({type: 'end_removal_by_index'});
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
          <Button extraClass={styles.form__button_size_small} text='Добавить в head' type='button' name='add_to_head' isLoader={addingToHead} onClick={addToHead} disabled={currentLetter === '' || animationIsWorking}/>
          <Button extraClass={styles.form__button_size_small} text='Добавить в tail' type='button' name='add_to_tail' isLoader={addingToTail} onClick={addToTail} disabled={currentLetter === ''|| animationIsWorking}/>
          <Button extraClass={styles.form__button_size_small} text='Удалить из head' type='button' name='delete_from_head' isLoader={removalFromHead} onClick={deleteFromHead} disabled={animationIsWorking || list.getSize() === 0}/>
          <Button extraClass={styles.form__button_size_small} text='Удалить из tail' type='button' name='delete_from_tail' isLoader={removalFromTail} onClick={deleteFromTail} disabled={animationIsWorking || list.getSize() === 0}/>
        </fieldset>

        <fieldset className={styles.form__fieldset} id='list_by_index'>
          <Input extraClass={styles.form__input} placeholder='Введите индекс' type="number" min={0} max={currentList.length} value={currentIndex} onChange={handleChange}/>
          <Button extraClass={styles.form__button_size_large} text='Добавить по индексу' type='button' name='add_by_index' isLoader={addingByIndex} onClick={addByIndex} disabled={currentLetter === '' || currentIndex === '' || animationIsWorking || currentIndex > list.getSize()}/>
          <Button extraClass={styles.form__button_size_large} text='Удалить по индексу' type='button' name='delete_by_index' isLoader={removalByIndex} onClick={deleteByIndex} disabled={currentIndex === '' || animationIsWorking || currentIndex > list.getSize() - 1}/>
        </fieldset>

        <section className={styles.listArea}>
          {renderList}
        </section>
      </form>
    </SolutionLayout>
  );
};
