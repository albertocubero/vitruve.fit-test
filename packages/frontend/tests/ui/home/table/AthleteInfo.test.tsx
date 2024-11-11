import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, RouteComponentProps } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import AthleteInfo from '../../../../src/ui/home/table/AthleteInfo';
import { IAthlete } from '../../../../src/domain/types/IAthlete';

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

describe('AthleteInfo', () => {
  const athlete: IAthlete = {
    id: '1',
    name: 'John Doe',
    age: 25,
    team: 'Team A',
  };

  it('renders athlete information correctly', () => {
    const historyPushMock = jest.fn();
    const history = { push: historyPushMock };
    const props = { history } as unknown as RouteComponentProps;

    render(
      <MemoryRouter>
        <AthleteInfo athlete={athlete} {...props} />
      </MemoryRouter>
    );

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/25/i)).toBeInTheDocument();
    expect(screen.getByText(/Team A/i)).toBeInTheDocument();
  });

  it('navigates to athlete details when the name is clicked', async () => {
    const historyPushMock = jest.fn();
    const history = { push: historyPushMock };
    const props = { history } as unknown as RouteComponentProps;
    render(
      <MemoryRouter>
        <AthleteInfo athlete={athlete} {...props} />
      </MemoryRouter>
    );

    await userEvent.click(screen.getByText(/John Doe/i));

    expect(historyPushMock).toHaveBeenCalledWith('/athletes/1');
  });
});