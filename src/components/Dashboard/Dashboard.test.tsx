import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from './Dashboard';

test('renders Dashboard component with columns', () => {
  const { getByText } = render(<Dashboard />);
  expect(getByText('To Do')).toBeInTheDocument();
  expect(getByText('In Progress')).toBeInTheDocument();
  expect(getByText('Done')).toBeInTheDocument();
});