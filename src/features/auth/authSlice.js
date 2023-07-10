import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, loginUser, logout,checkAuth } from "./authAPI";
import { updateUser } from "../user/userAPI";

const initialState = {
  loggedInUserToken: null,
  status: "idle",
  error: null,
  userChecked:false
};

export const CreateUserAsync = createAsyncThunk(
  "users/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  "users/loginUser",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const checkAuthAsync = createAsyncThunk("users/checkAuth", async () => {
  try {
    const response = await checkAuth();
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const updateUserAsync = createAsyncThunk(
  "users/updateUser",
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
);

export const logoutAsync = createAsyncThunk("users/logout", async (user) => {
  const response = await logout(user);
  return response.data;
});

export const counterSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(CreateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(CreateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(logoutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = null;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userChecked= true;
        state.loggedInUserToken = action.payload;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userChecked= true;
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectErrorLoggedInUser = (state) => state.auth.error;
export const selectCheckedUser = (state) => state.auth.userChecked;

export const { increment } = counterSlice.actions;

export default counterSlice.reducer; //authReducer
