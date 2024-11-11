import React from 'react';
import { render, screen } from '@testing-library/react';
import { AthleteList } from '../../../src/ui/home/AthleteList';
import { useGetAthletes } from '../../../src/ui/hooks/athlete/useGetAthletes';

jest.mock('../../../src/ui/hooks/athlete/useGetAthletes');
jest.mock('../../../src/ui/home/table/AthleteTable', () => ({ athletes }) => (
  <div data-testid="athlete-table">Athlete Table with {athletes.length} athletes</div>
));
jest.mock('../../../src/ui/home/table/AthleteEmptyTable', () => () => <div data-testid="athlete-empty-table">No Athletes</div>);
jest.mock('../../../src/ui/common/ErrorMessage', () => ({ message }) => <div data-testid="error-message">{message}</div>);
jest.mock('../../../src/ui/common/Loading', () => () => <div data-testid="loading">Loading...</div>);
jest.mock('../../../src/ui/home/HomePageHeader', () => ({ athletes }) => <div data-testid="home-page-header">Header with {athletes?.length} athletes</div>);

describe('AthleteList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    (useGetAthletes as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    render(<AthleteList />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders error message', () => {
    (useGetAthletes as jest.Mock).mockReturnValue({
      data: null,
      error: { message: 'Failed to fetch athletes' },
      isLoading: false,
    });

    render(<AthleteList />);

    expect(screen.getByTestId('error-message')).toHaveTextContent('Failed to fetch athletes');
  });

  it('renders empty athlete table', () => {
    (useGetAthletes as jest.Mock).mockReturnValue({
      data: [],
      error: null,
      isLoading: false,
    });

    render(<AthleteList />);

    expect(screen.getByTestId('athlete-empty-table')).toBeInTheDocument();
  });

  it('renders athlete table with athletes', () => {
    const athletes = [{ id: 1, name: 'Athlete 1' }, { id: 2, name: 'Athlete 2' }];
    (useGetAthletes as jest.Mock).mockReturnValue({
      data: athletes,
      error: null,
      isLoading: false,
    });

    render(<AthleteList />);

    expect(screen.getByTestId('athlete-table')).toHaveTextContent('Athlete Table with 2 athletes');
  });

  it('renders home page header', () => {
    const athletes = [{ id: 1, name: 'Athlete 1' }];
    (useGetAthletes as jest.Mock).mockReturnValue({
      data: athletes,
      error: null,
      isLoading: false,
    });

    render(<AthleteList />);

    expect(screen.getByTestId('home-page-header')).toHaveTextContent('Header with 1 athletes');
  });
});