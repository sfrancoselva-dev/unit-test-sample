import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  beforeEach(() => {
    // Mock fetch to return test users
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            { id: 1, name: "test user 1" },
            { id: 2, name: "test user 2" },
          ]),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("App renders Search and Users components", async () => {
    render(<App />);

    // Wait for the users to load
    await waitFor(() =>
      expect(screen.getByText("test user 1")).toBeInTheDocument()
    );

    // Check if search input is present
    expect(screen.getByPlaceholderText("search users")).toBeInTheDocument();
  });

  test("displays users after fetching", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("test user 1")).toBeInTheDocument();
      expect(screen.getByText("test user 2")).toBeInTheDocument();
    });
  });

  test("filters users based on search term", async () => {
    render(<App />);

    await waitFor(() =>
      expect(screen.getByText("test user 1")).toBeInTheDocument()
    );

    // Simulate typing in the search box
    const searchInput = screen.getByPlaceholderText("search users");
    fireEvent.change(searchInput, { target: { value: "test user 2" } });

    expect(screen.queryByText("test user 1")).not.toBeInTheDocument();
    expect(screen.getByText("test user 2")).toBeInTheDocument();
  });

  test("shows no users if search term does not match", async () => {
    render(<App />);

    await waitFor(() =>
      expect(screen.getByText("test user 1")).toBeInTheDocument()
    );

    const searchInput = screen.getByPlaceholderText("search users");
    fireEvent.change(searchInput, { target: { value: "xyz" } });

    // No users should be displayed
    expect(screen.queryByText("test user 1")).not.toBeInTheDocument();
    expect(screen.queryByText("test user 2")).not.toBeInTheDocument();
  });
});
