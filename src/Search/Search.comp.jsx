const Search = ({ placeholder, searchTerm, setSearchTerm }) => {
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="search">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
