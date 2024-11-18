import { render, screen } from "@testing-library/react";
import Users from "./Users.comp";

describe("Users component", () => {
  test("User component works as expected with empty data", async () => {
    render(<Users users={[]} />);
    expect(screen.queryByText(/test user 1/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId(/test user 2/i)).not.toBeInTheDocument();
  });

  test("Users component renders users list", async () => {
    const mockUsers = [
      { id: 1, name: "test user 1" },
      { id: 2, name: "test user 2" },
    ];
    render(<Users users={mockUsers} />);
    expect(screen.getByText(/test user 1/)).toBeInTheDocument();
    expect(screen.getByText(/test user 2/)).toBeInTheDocument();
  });
});
