import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

import { Button } from './button';

describe('Тестируем компонент Button', () => {
  it('Кнопка с текстом рендерится без ошибок', () => {
    const tree = renderer
      .create(<Button text="Кнопка" />).toJSON();
      expect(tree).toMatchSnapshot();
  });
  
  it('Кнопка без текста рендерится без ошибок', () => {
    const tree = renderer
      .create(<Button />).toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Заблокированная кнопка рендерится без ошибок', () => {
    const tree = renderer
      .create(<Button disabled={true} />).toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Кнопка с индикацией загрузки рендерится без ошибок', () => {
    const tree = renderer
      .create(<Button isLoader={true}/>).toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Клик на кнопку обрабатывается корректно', () => {
    const handleClick = jest.fn();

    render(<Button text="Кнопка" onClick={handleClick} data-testid="button" />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  })
})
