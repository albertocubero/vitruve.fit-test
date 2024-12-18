import React from 'react';
import { render, screen } from '@testing-library/react';
import TrashIcon from '../../../../src/ui/home/table/DeleteIcon';

describe('TrashIcon', () => {
    it('should render the trash icon', () => {
      render(<TrashIcon />);
  
      const icon = screen.getByTestId('trash-icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('w-6 h-6');
  
      const path = screen.getByTestId('trash-icon-path');
      expect(path).toHaveAttribute('d', 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16');
    });
  });