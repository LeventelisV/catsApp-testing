import { render, screen } from "@testing-library/react";
import Pets from "../Pets";
import { rest } from "msw";
import { setupServer } from "msw/node";
import mockCats from "../../../mock/cats.json";
import userEvent from "@testing-library/user-event";
import { within } from "@testing-library/dom";

const server = setupServer(
  rest.get("http://localhost:4000/cats", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockCats));
  })
);

beforeEach(() => {
  render(<Pets />);
});
beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

describe("Pets", () => {
  test("Should render the correct amount of cats ", async () => {
    const elements = await screen.findAllByRole("article");
    expect(elements.length).toBe(5);
  });

  test("Should filter male cards", async () => {
    const cards = await screen.findAllByRole("article");
    userEvent.selectOptions(screen.getByLabelText(/gender/i), "male");

    const maleCards = screen.getAllByRole("article");
    expect(maleCards).toEqual([cards[1], cards[3]]);
  });

  test("Should filter female cards", async () => {
    const cards = await screen.findAllByRole("article");
    userEvent.selectOptions(screen.getByLabelText(/gender/i), "female");
    const maleCards = screen.getAllByRole("article");
    expect(maleCards).toEqual([cards[0], cards[2], cards[4]]);
  });

  test("Should filter favored cards", async () => {
    const cards = await screen.findAllByRole("article");
    userEvent.click(within(cards[0]).getByRole("button"));
    userEvent.click(within(cards[1]).getByRole("button"));
    userEvent.selectOptions(screen.getByLabelText(/favourite/i), "favoured");
    expect(screen.getAllByRole("article")).toEqual([cards[0], cards[1]]);
  });

  test("Should filter not-favored cards", async () => {
    const cards = await screen.findAllByRole("article");
    userEvent.click(within(cards[0]).getByRole("button"));
    userEvent.click(within(cards[1]).getByRole("button"));
    userEvent.selectOptions(
      screen.getByLabelText(/favourite/i),
      "not favoured"
    );
    expect(screen.getAllByRole("article")).toEqual([
      cards[2],
      cards[3],
      cards[4],
    ]);
  });

  test("Should filter favoured male cats", async() => {
    const cards = await screen.findAllByRole("article");
    userEvent.click(within(cards[0]).getByRole("button"));
    userEvent.click(within(cards[1]).getByRole("button"));

    userEvent.selectOptions(
      screen.getByLabelText(/favourite/i),
      "favoured"
    );

    userEvent.selectOptions(
      screen.getByLabelText(/gender/i),
      "male"
    );

    expect(screen.getAllByRole("article")).toEqual([
      cards[1],
    ]);

  });
});
