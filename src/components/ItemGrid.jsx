import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchItems,
  setSearch,
  nextPage,
  prevPage,
} from "../redux/itemsSlice";
import ItemCard from "./ItemCard";

const ItemGrid = () => {
  const dispatch = useDispatch();
  const { items, search, page, itemsPerPage, loading, error } =
    useSelector((state) => state.items);
  const darkMode = useSelector((state) => state.ui.darkMode);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const start = (page - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(
    start,
    start + itemsPerPage
  );

  return (
    <section
      className={`px-6 py-12 min-h-screen
      ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50"}`}
    >
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        className={`w-full max-w-md mx-auto block mb-8 px-4 py-2 rounded border
        ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
      />

      {/* 🔄 Loading */}
      {loading && (
        <p className="text-center text-lg">Loading...</p>
      )}

      {/* ❌ Error */}
      {error && (
        <p className="text-center text-red-500">{error}</p>
      )}

      {/* ✅ Data */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedItems.map((item) => (
              <ItemCard key={item.id} {...item} />
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={() => dispatch(prevPage())}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <button
              onClick={() => dispatch(nextPage())}
              disabled={
                start + itemsPerPage >= filteredItems.length
              }
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default ItemGrid;
