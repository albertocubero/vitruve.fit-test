import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CreateAthleteButton from '../../../../src/ui/home/table/CreateAthleteButton';
import { RouteComponentProps } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

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
describe('CreateAthleteButton', () => {
  it('renders the button and navigates to the correct route on click', async () => {
    const historyPushMock = jest.fn();
    const history = { push: historyPushMock };
    const props = { history } as unknown as RouteComponentProps;

    render(
      <MemoryRouter>
        <CreateAthleteButton {...props} />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /create user/i });
    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    expect(historyPushMock).toHaveBeenCalledWith('/athletes/new');
  });
});