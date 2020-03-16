import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  const app = render(<App />);
  const logo = app.getByAltText('Pathfinder logo')
  expect(logo).toBeInTheDocument()
});
