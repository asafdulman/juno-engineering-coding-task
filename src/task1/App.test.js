import { render } from '@testing-library/react';
import { ImageCarousel } from './task1/imageCarousel';

/* eslint-disable */

describe('Image Carousel Component', () => {
  it('should render empty state when there are no images to display', () => {
    const { getByTestId } = render(<ImageCarousel />);
    expect(getByTestId('empty-state-box')).toBeInTheDocument
  });
})