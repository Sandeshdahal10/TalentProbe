import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    // `userData` holds the user object or null when not authenticated.
    // `checked` becomes true after we finish verifying auth on app start.
    userData: null,
    checked: false,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setChecked: (state, action) => {
      state.checked = action.payload;
    },
  },
});

export const { setUserData, setChecked } = userSlice.actions;
export default userSlice.reducer;
