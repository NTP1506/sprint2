import userApi from "api/userAPI";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const home = createSlice({
    name: "users",
    initialState: { loading: false, users: [] },
    reducers: {
        searchUser: (state, action) => {
            state.users = action.payload
        }
    },
    extraReducers: builder => {
        builder
        .addCase(fetchUsers.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.users = [];
        })
    }
})

const { reducer, actions } = home;
export const { searchUser } = actions;
export default reducer;

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const res = await userApi.getAll();
    return res;
})