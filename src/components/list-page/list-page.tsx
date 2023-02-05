import React from "react";
import styles from "./list-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";

import { ElementStates } from "../../types/element-states";

import { LinkedList } from "./list-class";

const list = new LinkedList<number | string>();

export const ListPage: React.FC = () => {

  const [currentLetter, setCurrentLetter] = React.useState<number | string >('');
  const [currentIndex, setCurrentIndex] = React.useState<number | ''>('');
  const [currentList, setCurrentList] = React.useState<{
    // elem_value: number | string,
    elem_value: any, 
    state: ElementStates, 
    index: number,
    isHead: boolean, 
    isTail: boolean, 
  }[]>([]);

  function createStartList() {
    list.append(0);
    list.append(34);
    list.append(8);
    list.append(1);

    setCurrentList([...list.getArray().map((value, i) => {
      return {elem_value: value, state: ElementStates.Default, index: i, isHead: i === 0 ? true : false, isTail: i === list.getSize() - 1 ? true : false}
    })]);
  };

  React.useEffect(() => {
    createStartList();
  }, []);

  const renderList = currentList.map((value, i) => {
    return (
      <div className={styles.listArea__list} key={i}>
        <Circle 
          letter={value.elem_value} 
          state={ElementStates.Default} 
          index={i} 
          head={value.isHead ? 'head' : ''} 
          tail={value.isTail ? 'tail' : ''} 
        />
        { i !== list.getSize() - 1 && <ArrowIcon /> }
          
      </div>
    )
  });

  function addToHead() {
    if (currentLetter !== '' && currentLetter !== null && currentLetter !== undefined) {
      list.prepend(currentLetter);
      setCurrentList([...list.getArray().map((value, i) => {
        return {elem_value: value, state: ElementStates.Default, index: i, isHead: i === 0 ? true : false, isTail: i === list.getSize() - 1 ? true : false}
      })]);

      setCurrentLetter('');
    }
  };

  function addToTail() {
    if (currentLetter !== '' && currentLetter !== null && currentLetter !== undefined) {
      list.append(currentLetter);
      setCurrentList([...list.getArray().map((value, i) => {
        return {elem_value: value, state: ElementStates.Default, index: i, isHead: i === 0 ? true : false, isTail: i === list.getSize() - 1 ? true : false}
      })]);

      setCurrentLetter('');
    }
  };

  function deleteFromHead() {
    list.deleteHead();

    setCurrentList([...list.getArray().map((value, i) => {
      return {elem_value: value, state: ElementStates.Default, index: i, isHead: i === 0 ? true : false, isTail: i === list.getSize() - 1 ? true : false}
    })]);
  };

  function deleteFromTail() {
    list.deleteTail();

    setCurrentList([...list.getArray().map((value, i) => {
      return {elem_value: value, state: ElementStates.Default, index: i, isHead: i === 0 ? true : false, isTail: i === list.getSize() - 1 ? true : false}
    })]);
  };

  function addByIndex() {
    if (currentIndex !== '' && currentIndex !== null && currentIndex !== undefined) {
      list.insertByIndex(currentLetter, Number(currentIndex));

      setCurrentList([...list.getArray().map((value, i) => {
        return {elem_value: value, state: ElementStates.Default, index: i, isHead: i === 0 ? true : false, isTail: i === list.getSize() - 1 ? true : false}
      })]);

      setCurrentLetter('');
      setCurrentIndex('');
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
          <Button extraClass={styles.form__button_size_small} text='Добавить в head' type='button' name='add_to_head' onClick={addToHead}/>
          <Button extraClass={styles.form__button_size_small} text='Добавить в tail' type='button' name='add_to_tail' onClick={addToTail}/>
          <Button extraClass={styles.form__button_size_small} text='Удалить из head' type='button' name='delete_from_head' onClick={deleteFromHead}/>
          <Button extraClass={styles.form__button_size_small} text='Удалить из tail' type='button' name='delete_from_tail' onClick={deleteFromTail}/>
        </fieldset>

        <fieldset className={styles.form__fieldset} id='list_by_index'>
          <Input extraClass={styles.form__input} placeholder='Введите индекс' type="number" min={0} max={currentList.length} value={currentIndex} onChange={handleChange}/>
          <Button extraClass={styles.form__button_size_large} text='Добавить по индексу' type='button' name='add_by_index' onClick={addByIndex}/>
          <Button extraClass={styles.form__button_size_large} text='Удалить по индексу' type='button' name='delete_by_index'/>
        </fieldset>

        <section className={styles.listArea}>
          {renderList}
        </section>
      </form>
    </SolutionLayout>
  );
};
