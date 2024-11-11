import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateAthlete from '../../../src/ui/create/CreateAthlete';
import { useCreateAthlete } from '../../../src/ui/hooks/athlete/useCreateAthlete';

jest.mock('../../../src/ui/hooks/athlete/useCreateAthlete', () => ({
  useCreateAthlete: jest.fn().mockReturnValue({
    createAthlete: jest.fn(),
    isSuccess: false,
    isError: false,
  }),
}));
jest.mock('../../../src/ui/create/CreatePageHeader', () => {
  return jest.fn(() => <div>CreatePageHeader Mocked</div>);
});
jest.mock('../../../src/ui/form/AthleteForm', () => {
  return jest.fn(() => <div>AthleteForm Mocked</div>);
});
jest.mock('../../../src/ui/common/SuccessMessage', () => {
  return jest.fn(() => <div>SuccessMessage Mocked</div>);
});
jest.mock('../../../src/ui/common/ErrorMessage', () => {
  return jest.fn(() => <div>ErrorMessage Mocked</div>);
});

describe('CreateAthlete', () => {
  it('should render CreatePageHeader and AthleteForm components correctly', () => {
    render(<CreateAthlete />);

    expect(screen.getByText('CreatePageHeader Mocked')).toBeInTheDocument();
    expect(screen.getByText('AthleteForm Mocked')).toBeInTheDocument();
    expect(screen.queryByText('SuccessMessage Mocked')).not.toBeInTheDocument();
    expect(screen.queryByText('ErrorMessage Mocked')).not.toBeInTheDocument();
  });

  it('should render SuccessMessage when athlete is created successfully', () => {
    (useCreateAthlete as jest.Mock).mockReturnValue({
      createAthlete: jest.fn(),
      isSuccess: true,
      isError: false,
    });

    render(<CreateAthlete />);

    expect(screen.getByText('SuccessMessage Mocked')).toBeInTheDocument();
  });

  it('should render ErrorMessage when athlete creation fails', () => {
    (useCreateAthlete as jest.Mock).mockReturnValue({
      createAthlete: jest.fn(),
      isSuccess: false,
      isError: true,
    });

    render(<CreateAthlete />);

    expect(screen.getByText('ErrorMessage Mocked')).toBeInTheDocument();
  });
});
