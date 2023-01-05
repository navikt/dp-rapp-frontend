import { act, render, screen, waitFor } from "@testing-library/react";
import Home from "../src/pages/index";
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";
// import mockRouter from 'next-router-mock';

fetchMock.enableMocks();


jest.mock('next/router', () => require('next-router-mock'));

jest.mock('react-i18next', () => ({
    useTranslation: () => {
        return {
            t: (str) => "Ny løsning",
            i18n: {
                changeLanguage: () => new Promise(() => {
                }),
            },
        };
    },
}));

describe("Home", () => {

    beforeEach(() => {
        fetch.resetMocks();
    });

    it("renders a heading", async () => {
        fetch.mockResponseOnce(JSON.stringify([]));

        act(() => {
            render(<Home periods={[]} />);
        });

        await waitFor(() => {
            const heading = screen.getByRole("heading", {
                name: /Ny løsning/i,
            });

            expect(heading).toBeInTheDocument();
        });
    });
});
