import { render, screen } from "@testing-library/react";
import Home from "../src/pages/index";
import "@testing-library/jest-dom";
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => "Ny løsning",
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe("Home", () => {

  beforeEach(() => {
    mockRouter.locale = "nb"
  });

  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /Ny løsning/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
