import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BackButton from '../../../src/ui/common/BackButton';
import { MemoryRouter, RouteComponentProps } from 'react-router-dom';

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    withRouter: (Component: React.ComponentType<any>) => {
      return (props: any) => {
        return <Component {...props} />;
      };
    },
  };
});

describe('BackButton', () => {
  it('should navigate to home when clicked', async () => {
    const historyPushMock = jest.fn();
    const history = { push: historyPushMock };
    const props = { history } as unknown as RouteComponentProps;
    render(
      <MemoryRouter>
        <BackButton {...props} />
      </MemoryRouter>
    );

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(historyPushMock).toHaveBeenCalledWith('/');
  });
});
