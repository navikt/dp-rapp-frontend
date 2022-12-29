import { render, screen } from "@testing-library/react";
import Home from "../src/pages/index";
import "@testing-library/jest-dom";
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));

describe("Home", () => {

  beforeEach(() => {
    mockRouter.locale = "no"
  });

  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /Ny løsning/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
