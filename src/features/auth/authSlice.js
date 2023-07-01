import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser,checkUser,updateUser} from './authAPI';

const initialState = {
  loggedInuser: null,
  status: 'idle',
  error: null,
};


export const CreateUserAsync = createAsyncThunk(
  'users/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const CheckUserAsync = createAsyncThunk(
  'users/checkUser',
  async (loginInfo) => {
    const response = await checkUser(loginInfo);
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'users/updateUser',
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(CreateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(CreateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInuser = action.payload;
      })
      .addCase(CheckUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(CheckUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInuser = action.payload;
      })
      .addCase(CheckUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInuser = action.payload;
      });
  },
});


export const selectLoggedInUser = (state)=>state.auth.loggedInuser
export const selectErrorLoggedInUser = (state)=>state.auth.error
export const { increment} = counterSlice.actions;



export default counterSlice.reducer;  //authReducer
