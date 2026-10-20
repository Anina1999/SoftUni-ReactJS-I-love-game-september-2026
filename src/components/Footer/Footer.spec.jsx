import { it, expect } from 'vitest';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import Footer from './Footer';
import { render, screen } from '@testing-library/react';

//Tell React we are in a test environment, so act(...) doesn't warn
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

it('should render the footer component correctly - old school', () => {
    //Create html container element
    const container = document.createElement('div');
    
    //Attach container to DOM
    document.body.append(container);

    //Create react root
    const root = createRoot(container);

    //Wait for footer to render
    act(() => root.render(<Footer />));

    //Define footer and assert
    const footer = container.querySelector('footer');
    expect(footer).not.toBeNull();
    expect(footer.textContent).toBe('React Course Exercise @ SoftUni ™');


    act(() => root.unmount());
    container.remove();
});

it('should render the footer component correctly -  using testing-library', () => {
    //Render creates its own container and attaches it to DOM
    render(<Footer />);

    //Find text on the whole page (getByText throws if it's missing)
    const text = screen.getByText('React Course Exercise @ SoftUni ™');

    //Assert text is inside the footer
    expect(text.closest('footer')).not.toBeNull();
});

it('should render the footer component correctly -  using jest-dom matchers', () => {
    //Render creates its own container and attaches it to DOM
    render(<Footer />);

    //Find footer by its role (<footer> has role "contentinfo")
    const footer = screen.getByRole('contentinfo');

    //Assert with jest-dom matchers
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveTextContent('React Course Exercise @ SoftUni ™');
});

//Snapshot testing
it('should match the snapshot', () => {
    //asFragment returns the whole rendered markup of the component
    const { asFragment } = render(<Footer />);

    //First run saves the snapshot in __snapshots__, next runs compare with it
    expect(asFragment()).toMatchSnapshot();
});