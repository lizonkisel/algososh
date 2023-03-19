import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

import { Circle } from './circle';

import { ElementStates } from '../../../types/element-states';

describe('Тестируем компонент Button', () => {
    it('Circle рендерится без букв', () => {
        const tree = renderer.create(<Circle />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('Circle рендерится с буквами', () => {
        const tree = renderer.create(<Circle letter="text"/>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('Circle рендерится с текстом в head', () => {
        const tree = renderer.create(<Circle head="head"/>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('Circle рендерится с react-element в head', () => {
        const tree = renderer.create(<Circle head={<Circle />}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('Circle рендерится с текстом в tail', () => {
        const tree = renderer.create(<Circle tail="tail"/>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('Circle рендерится с react-element в tail', () => {
        const tree = renderer.create(<Circle tail={<Circle />}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('Circle рендерится с index', () => {
        const tree = renderer.create(<Circle index={0}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('Circle рендерится с пропом isSmall === true', () => {
        const tree = renderer.create(<Circle isSmall={true}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('Circle рендерится в состоянии default', () => {
        const tree = renderer.create(<Circle state={ElementStates.Default}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('Circle рендерится в состоянии changing', () => {
        const tree = renderer.create(<Circle state={ElementStates.Changing}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('Circle рендерится в состоянии modified', () => {
        const tree = renderer.create(<Circle state={ElementStates.Modified}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
