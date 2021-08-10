import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Landing } from './Landing';
import { setupIntersectionObserverMock } from '../../../test/setupIntersectionObserver';

import '@testing-library/jest-dom/extend-expect';

describe('Landing', () => {
  beforeAll(() => {
    setupIntersectionObserverMock();
  })

  it('renders start button', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router history={history}>
        <Landing />
      </Router>
    );
    expect(getByRole('button')).toBeInTheDocument();
  })

  it('changes page on button press', (done) => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router history={history}>
        <Landing />
      </Router>
    );
    expect(getByRole('button')).toBeInTheDocument();
    getByRole('button').click();
    setTimeout(() => {
      expect(history.location.pathname).toEqual('/assessment');
      done();
    }, 500)
  })

})