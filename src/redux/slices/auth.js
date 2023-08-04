import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { login } from "../../utils/https/auth";

const initialState = {
  data: [],
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  err: null,
};

const getAuthThunk = createAsyncThunk(
  "auth/post",
  async ({ email, password }, controller) => {
    try {
      const response = await login(controller, email, password);
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    filter: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuthThunk.pending, (prevState) => {
        return {
          ...prevState,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
          err: null,
        };
      })
      .addCase(getAuthThunk.fulfilled, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: true,
          data: action.payload,
        };
      })
      .addCase(getAuthThunk.rejected, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isRejected: true,
          err: action.payload,
        };
      });
  },
});

export const authAction = {
  ...authSlice.actions,
  getAuthThunk,
};
export default authSlice.reducer;
