import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddMetricForm from '../../../../src/ui/edit/sections/AddMetricForm';
import { useAddAthleteMetrics } from '../../../../src/ui/hooks/metric/useAddAthleteMetrics';

jest.mock('../../../../src/ui/hooks/metric/useAddAthleteMetrics');
jest.mock('../../../../src/ui/common/SuccessMessage', () => () => (
  <div>The metric was created!</div>
));
jest.mock('../../../../src/ui/common/ErrorMessage', () => () => (
  <div>
    Failed to create the metric. Please check the input data and try again.
  </div>
));

const mockAddMetric = jest.fn();

describe('AddMetricForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAddAthleteMetrics as jest.Mock).mockReturnValue({
      addMetric: mockAddMetric,
      isSuccess: false,
      isError: false,
    });
  });

  it('renders form and submits successfully', async () => {
    (useAddAthleteMetrics as jest.Mock).mockReturnValueOnce({
      addMetric: mockAddMetric,
      isSuccess: true,
      isError: false,
    });

    render(<AddMetricForm athleteId="123" />);

    await userEvent.type(screen.getByLabelText(/Metric Type/i), 'Speed');
    await userEvent.type(screen.getByLabelText(/Value/i), '10');
    await userEvent.type(screen.getByLabelText(/Unit/i), 'm/s');

    await userEvent.click(screen.getByRole('button', { name: /Add Metric/i }));

    await waitFor(() => {
      expect(mockAddMetric).toHaveBeenCalledWith({
        athleteId: '123',
        metricType: 'Speed',
        value: 10,
        unit: 'm/s',
        timestamp: expect.any(Date),
      });
      expect(screen.getByText(/The metric was created!/i)).toBeInTheDocument();
    });
  });

  it('shows error message when metric creation fails', async () => {
    render(<AddMetricForm athleteId="123" />);

    await userEvent.type(screen.getByLabelText(/Metric Type/i), 'Speed');
    await userEvent.type(screen.getByLabelText(/Value/i), '10');
    await userEvent.type(screen.getByLabelText(/Unit/i), 'm/s');

    (useAddAthleteMetrics as jest.Mock).mockReturnValue({
      addMetric: mockAddMetric,
      isSuccess: false,
      isError: true,
    });

    await userEvent.click(screen.getByRole('button', { name: /Add Metric/i }));

    await waitFor(() => {
      expect(
        screen.getByText(
          /Failed to create the metric. Please check the input data and try again./i
        )
      ).toBeInTheDocument();
    });
  });
});
