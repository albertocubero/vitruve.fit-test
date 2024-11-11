import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, RouteComponentProps } from 'react-router-dom';
import AthleteEditLink from '../../../../src/ui/home/buttons/AthleteEditLink';

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

describe('AthleteEditLink', () => {
  const athleteId = '123';

  it('renders the button', () => {
    render(
      <MemoryRouter>
        <AthleteEditLink athleteId={athleteId} />
      </MemoryRouter>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('navigates to the edit page when clicked', () => {
    const historyPushMock = jest.fn();
    const history = { push: historyPushMock };
    const props = { history } as unknown as RouteComponentProps;

    render(
      <MemoryRouter initialEntries={['/']}>
        <AthleteEditLink athleteId={athleteId} {...props} />
      </MemoryRouter>
    );

    screen.getByRole('button').click();

    expect(historyPushMock).toHaveBeenCalledWith('/athletes/edit/123');
  });
});
