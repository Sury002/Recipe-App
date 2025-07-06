export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
