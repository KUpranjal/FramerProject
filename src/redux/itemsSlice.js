import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* 🔹 API CALL */
export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const data = await res.json();
    return data.slice(0, 50); // keep 50 items
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    search: "",
    page: 1,
    itemsPerPage: 8,
    loading: false,
    error: null,
  },
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
      state.page = 1;
    },
    nextPage(state) {
      state.page++;
    },
    prevPage(state) {
      if (state.page > 1) state.page--;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.body,
          status: item.id % 2 === 0 ? "Completed" : "Pending",
        }));
      })
      .addCase(fetchItems.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load data";
      });
  },
});

export const { setSearch, nextPage, prevPage } =
  itemsSlice.actions;
export default itemsSlice.reducer;
