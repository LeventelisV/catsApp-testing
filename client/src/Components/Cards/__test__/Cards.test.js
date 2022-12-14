import { render, screen } from "@testing-library/react";
import Cards from "../Cards";
import cats from "../../../mock/cats.json";

describe("Cards", () => {
  test("Should render five card components", () => {
      render(<Cards cats={cats}/>)
      expect(screen.getAllByRole("article").length).toBe(5)
  });
});
