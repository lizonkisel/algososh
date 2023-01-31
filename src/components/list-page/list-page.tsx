import React from "react";
import styles from "./list-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import { ElementStates } from "../../types/element-states";

export const ListPage: React.FC = () => {
  return (
    <SolutionLayout title="Связный список">
      <form action="" className={styles.form}>
        <fieldset className={styles.form__fieldset} id='list_to_head_or_tail'>
          <Input extraClass={styles.form__input} placeholder='Введите значение' type="text" maxLength={4} isLimitText={true} />
          <Button extraClass={styles.form__button_size_small} text='Добавить в head' type='button' name='add_to_head'/>
          <Button extraClass={styles.form__button_size_small} text='Добавить в tail' type='button' name='add_to_tail'/>
          <Button extraClass={styles.form__button_size_small} text='Удалить из head' type='button' name='delete_from_head'/>
          <Button extraClass={styles.form__button_size_small} text='Удалить из tail' type='button' name='delete_from_tail'/>
        </fieldset>

        <fieldset className={styles.form__fieldset} id='list_by_index'>
          <Input extraClass={styles.form__input} placeholder='Введите индекс' type="number" min={0}/>
          <Button extraClass={styles.form__button_size_large} text='Добавить по индексу' type='button' name='add_by_index'/>
          <Button extraClass={styles.form__button_size_large} text='Удалить по индексу' type='button' name='delete_by_index'/>
        </fieldset>

        <section className={styles.stackArea}>
          {/* {renderStack} */}
        </section>
      </form>
    </SolutionLayout>
  );
};
