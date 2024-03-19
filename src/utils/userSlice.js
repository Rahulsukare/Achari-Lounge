import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            const { name, email , address, phoneNumber  } = action.payload;
            state.user = { name, email , address, phoneNumber  };
        },
        removeUser: (state, action) => {
            state.user = null;
        }
    }
})
export const {addUser, removeUser} = userSlice.actions;
export default userSlice.reducer;