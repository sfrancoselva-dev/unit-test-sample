import { render, screen, fireEvent } from "@testing-library/react";
import Search from "./Search.comp";

describe("Search Component", () => {
  test("Search component renders with intital values", () => {
    render(
      <Search
        placeholder="search users"
        searchTerm="test user"
        setSearchTerm={() => {}}
      />
    );

    const searchInput = screen.getByPlaceholderText(/search users/i);
    expect(searchInput).toBeInTheDocument();
    expect(searchInput.value).toBe("test user");
  });

  test("handleChange functionality", () => {
    const setSearchTerm = jest.fn();
    render(
      <Search
        placeholder="search users"
        searchTerm=""
        setSearchTerm={setSearchTerm}
      />
    );
    const searchInput = screen.getByPlaceholderText(/search users/i);
    fireEvent.change(searchInput, { target: { value: "test user" } });
    expect(setSearchTerm).toHaveBeenCalledWith("test user");
  });
});
