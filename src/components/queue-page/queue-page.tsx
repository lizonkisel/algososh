import React from "react";
import styles from "./queue-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../utils";

import { Queue } from "./queue-class";

const queue = new Queue<number | string>(7);

export const QueuePage: React.FC = () => {

  const [currentLetter, setCurrentLetter] = React.useState<number | string >('');
  const [currentQueue, setCurrentQueue] = React.useState<{
    letter: number | string,
    state: ElementStates, 
    index: number, 
    isHead: boolean,
    isTail: boolean
  }[]>([]);

  interface IInitialState {
    adding: boolean,
    removal: boolean,
    cleaning: boolean,
  }

  const initialState: IInitialState = {
    adding: false,
    removal: false,
    cleaning: false,
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const {adding, removal, cleaning} = state;

  function reducer(state: IInitialState, action: any) {
    switch (action.type) {
      case 'start_adding':
        return {
          ...state,
          adding: true,
        };
      case 'end_adding':
        return {
          ...state,
          adding: false,
        };
      case 'start_removal':
        return {
          ...state,
          removal: true,
        };
      case 'end_removal':
        return {
          ...state,
          removal: false,
        };
      case 'start_cleaning':
        return {
          ...state,
          cleaning: true,
        };
      case 'end_cleaning':
        return {
          ...state,
          cleaning: false,
        };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  };

  React.useEffect(() => {
    initializeQueue();
  }, []);

  function initializeQueue() {
    const tempArr = [];
    for (let i = 0; i < queue.getQueueLength(); i++) {
      tempArr.push({
        letter: '',
        state: ElementStates.Default,
        index: i,
        isHead: false,
        isTail: false
      });
    }
    setCurrentQueue(tempArr);
  };

  const addToQueue = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentLetter !== '' && currentLetter !== null && currentLetter !== undefined) {
      queue.enqueue(currentLetter);

      dispatch({type: 'start_adding'});

      setCurrentQueue([...queue.getQueue().map((value, i) => {
        return {
          letter: value, 
          state: i + 1 === queue.getTailIndex() ? ElementStates.Changing : ElementStates.Default, 
          index: i, 
          isHead: i === queue.getHeadIndex() ? true : false, 
          isTail: i + 1 === queue.getTailIndex() ? true : false
        }
      })]);
    }

    await delay(SHORT_DELAY_IN_MS);

    setCurrentQueue([...queue.getQueue().map((value, i) => {
      return {
        letter: value, 
        state: ElementStates.Default, 
        index: i, 
        isHead: i === queue.getHeadIndex() ? true : false, 
        isTail: i + 1 === queue.getTailIndex() ? true : false
      }
    })]);

    setCurrentLetter('');

    dispatch({type: 'end_adding'});
  };

  const deleteFromQueue = async() => {
    dispatch({type: 'start_removal'});

    setCurrentQueue([...queue.getQueue().map((value, i) => {
      return {
        letter: value, 
        state: i === queue.getHeadIndex() ? ElementStates.Changing : ElementStates.Default, 
        index: i, 
        isHead: i === queue.getHeadIndex() ? true : false,
        isTail: i + 1 === queue.getTailIndex() ? true : false
      }
    })]);

    queue.dequeue();

    await delay(SHORT_DELAY_IN_MS);
    
    setCurrentQueue([...queue.getQueue().map((value, i) => {
      return {
        letter: value, 
        state: ElementStates.Default, 
        index: i,
        isHead: (i === queue.getHeadIndex()) ? true : false, 
        isTail: i + 1 === queue.getTailIndex() ? true : false
      }
    })]);

    dispatch({type: 'end_removal'});
  };

  function clearQueue() {
    dispatch({type: 'start_cleaning'});

    queue.clear();

    setCurrentQueue([...queue.getQueue().map((value, i) => {
      return {
        letter: value, 
        state: ElementStates.Default, 
        index: i, 
        isHead: false, 
        isTail: false
      }
    })]);

    dispatch({type: 'end_cleaning'});
  };

  const renderQueue = currentQueue.map((value, i) => {
    // Вот этот if нужен для того, чтобы после удаления (queue.dequeue()) последнего элемента из очереди
    // над ним оставалась надпись "head"
    if (value === undefined && i + 1 === queue.getSize() && queue.getHeadIndex() === queue.getQueueLength()) {
      return (
        <Circle 
          letter={''} 
          state={ElementStates.Default} 
          index={i} 
          head={'head'} 
          tail={''}
          key={i}
        />
      )
    }
    else if (value === undefined) {
      return (
        <Circle 
          letter={''} 
          state={ElementStates.Default} 
          index={i} 
          head={''} 
          tail={''}
          key={i}
        />
      )
    }    
    else {
      return (
        <Circle 
          letter={value.letter.toString()} 
          state={value.state} 
          index={value.index} 
          head={value.isHead ? 'head' : ''} 
          tail={value.isTail ? 'tail' : ''}
          key={i}
        />
      )
    }
  });

  return (
    <SolutionLayout title="Очередь">
      <form action="" className={styles.form} onSubmit={addToQueue}>
        <fieldset className={styles.form__fieldset} id='stack'>
          <Input extraClass={styles.form__input} type="text" maxLength={4} isLimitText={true} value={currentLetter} onChange={(e) => setCurrentLetter(e.currentTarget.value)}/>
          <Button extraClass={styles.form__button} text='Добавить' type='submit' name='add' isLoader={adding} disabled={currentLetter === '' || removal || cleaning}/>
          <Button extraClass={styles.form__button} text='Удалить' type='button' name='delete' isLoader={removal} onClick={deleteFromQueue} disabled={queue.isEmpty() || (queue.getHeadIndex() === 0 && queue.getTailIndex() === 0) || adding || cleaning}/>
          <Button extraClass={styles.form__button} text='Очистить' type='button' name='clear' isLoader={cleaning} onClick={clearQueue} disabled={queue.isEmpty() || (queue.getHeadIndex() === 0 && queue.getTailIndex() === 0) || adding || removal}/>
        </fieldset>

        <section className={styles.stackArea}>
          {renderQueue}
        </section>
      </form>
    </SolutionLayout>
  );
};
