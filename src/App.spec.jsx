import { expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./contexts/auth-context";

it('should render the App component correctly', async () => {
    render(
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    );

    //AuthProvider renders nothing until Firebase auth is ready, so wait for the link (findBy* is async)
    const loginLink = await screen.findByRole('link', { name: 'Login' });

    fireEvent.click(loginLink);

    expect(screen.getByRole('heading', { name: 'Login', level: 1 })).toBeInTheDocument();
});
