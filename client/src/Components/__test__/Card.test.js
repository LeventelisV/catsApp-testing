import { render, screen } from "@testing-library/react";
import Card from "../Card/Card";
import userEvent from "@testing-library/user-event";

const cardProps = {
  name: "Sydney",
  phone: "111-111-11111",
  email: "sydney@gmail.com",
  image: {
    url: "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60",
    alt: "cute cat",
  },
  favored: false,
  index: 1,
  updateFavoured: () => {},
};

describe("Card", () => {
  test("Should show name of the cat", () => {
    render(<Card {...cardProps} />);
    expect(
      screen.getByRole("heading", {
        name: /sydney/i,
      })
    ).toBeInTheDocument();
  });
  test("Should show phone number of the cat", () => {
    render(<Card {...cardProps} />);
    expect(screen.getByText(/111-111-11111/i)).toBeInTheDocument();
  });

  test("Should show email of the cat", () => {
    render(<Card {...cardProps} />);
    expect(screen.getByText(/sydney@gmail.com/i)).toBeInTheDocument();
  });

  test("Should show image of the cat", () => {
    render(<Card {...cardProps} />);
    // expect(screen.getByAltText("cute cat").src).toBe(cardProps.image.url)
    expect(screen.getByAltText(/cute cat/i).src).toBe(cardProps.image.url);
  });

  test("should show outline heart", () => {
    render(<Card {...cardProps} />);

    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
  });

  test("should show filled heart", () => {
    render(<Card {...cardProps} favored={true} />);

    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
  });

  test("should toggle the heart button", () => {
    render(<Card {...cardProps} />);

    userEvent.click(screen.getByRole("button"));

    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();

    userEvent.click(screen.getByRole("button"));

    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
  });
});
