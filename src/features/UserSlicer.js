import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../api/User";
import {
  clearStorage,
  getToken,
  getUser,
  setToken,
  setUser,
} from "../services/helper";

const initialState = {
  loading: false,
  user: null,
  token: null,
  message: null,
  error: null,
};

// Login user action
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (user, { rejectWithValue }) => {
    try {
      const results = await loginUser(user);
      if (results.success) {
        const { token, user } = results.data;
        await setToken(token);
        await setUser(user);
        return { user, token };
      }
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data.error);
    }
  }
);

// Register user action
export const userRegister = createAsyncThunk(
  "user/userRegister",
  async (user, { rejectWithValue }) => {
    try {
      const results = await registerUser(user);
      return results.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

// Logout action
export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  await clearStorage();
});

export const checkUser = createAsyncThunk("user/checkUser", async () => {
  const token = await getToken();
  if (token) {
    const user = await getUser();
    return { user, token };
  } else {
    return null;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.message = "Successfully logged in";
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
      })
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.message = "Successfully registered";
        state.error = null;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.message = "Successfully logged out";
        state.error = null;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload ? action.payload.user : null;
        state.token = action.payload ? action.payload.token : null;
        state.message = action.payload ? "User is logged in" : null;
        state.error = null;
      });
  },
});

export default userSlice.reducer;
