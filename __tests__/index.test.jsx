import { render, screen } from "@testing-library/react";
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

    it("renders a heading", () => {
        // fetch.mockResponseOnce(JSON.stringify([]));

        render(<Home periods={[]} />);

        const heading = screen.getByRole("heading", {
            name: /Ny løsning/i,
        });

        expect(heading).toBeInTheDocument();
    });
});
