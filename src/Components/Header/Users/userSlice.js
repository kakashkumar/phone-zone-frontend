import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../Services/api";

export const userLogin = createAsyncThunk(
  "userSlice/userLogin",
  async (formData) => {
    const response = api.user.login(formData);
    return response;
  }
);

export const checkEmail = createAsyncThunk(
  "userSlice/checkEmail",
  async (data) => {
    const response = api.user.checkEmail(data);
    return response;
  }
);

export const resetPassword = createAsyncThunk(
  "userSlice/resetPassword",
  async (data) => {
    const response = api.user.resetPassword(data);
    return response;
  }
);

export const registerUser = createAsyncThunk(
  "userSlice/registerUser",
  async (data) => {
    const response = api.user.registerUser(data);
    return response;
  }
);

export const userList = createAsyncThunk("userSlice/userList", async (data) => {
  const response = api.user.getUsers(data);
  return response;
});

export const getUserById = createAsyncThunk(
  "userSlice/getUserById",
  async (data) => {
    const response = api.user.getUserById(data);
    return response;
  }
);

export const updateUser = createAsyncThunk(
  "userSlice/updateUser",
  async (data) => {
    const response = api.user.updateUser(data);
    return response;
  }
);

const initialState = {
  loginLoading: false,
  loginData: {},
  loginError: "",
  checkEmailLoading: false,
  checkEmailData: {},
  checkEmailError: "",
  resetPasswordLoading: false,
  resetPasswordData: {},
  resetPasswordError: "",
  registerUserLoading: false,
  registerUserData: {},
  registerUserError: "",
  userListLoading: false,
  userListData: [],
  userListError: "",
  userLoading: false,
  userData: [],
  userError: "",
  updateUserLoading: false,
  updateUserData: [],
  updateUserError: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.registerUserLoading = true;
        state.registerUserError = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerUserLoading = false;
        state.registerUserData = action?.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerUserLoading = false;
        state.registerUserData = action?.payload;
        state.registerUserError = action?.error.message;
      })
      // login
      .addCase(userLogin.pending, (state) => {
        state.loginLoading = true;
        state.loginError = "";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginData = action?.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginData = action?.payload;
        state.checkEmailError = action?.error.message;
      })
      // checkEmail
      .addCase(checkEmail.pending, (state) => {
        state.checkEmailLoading = true;
        state.checkEmailError = "";
      })
      .addCase(checkEmail.fulfilled, (state, action) => {
        state.checkEmailLoading = false;
        state.checkEmailData = action?.payload?.data;
      })
      .addCase(checkEmail.rejected, (state, action) => {
        state.checkEmailLoading = false;
        state.checkEmailData = action?.payload;
        state.checkEmailError = action?.error.message;
      })
      // resetPassword
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordLoading = true;
        state.resetPasswordError = "";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPasswordLoading = false;
        state.resetPasswordData = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordLoading = false;
        state.resetPasswordData = action?.payload;
        state.resetPasswordError = action?.error.message;
      })
      // resetPassword
      .addCase(userList.pending, (state) => {
        state.userListLoading = true;
        state.userListError = "";
      })
      .addCase(userList.fulfilled, (state, action) => {
        state.userListLoading = false;
        state.userListData = action.payload;
      })
      .addCase(userList.rejected, (state, action) => {
        state.userListLoading = false;
        state.userListData = action?.payload;
        state.userListError = action?.error.message;
      })
      // get user by id
      .addCase(getUserById.pending, (state) => {
        state.userLoading = true;
        state.userError = "";
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userData = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.userLoading = false;
        state.userData = action?.payload;
        state.userError = action?.error.message;
      })
      // update user
      .addCase(updateUser.pending, (state) => {
        state.updateUserLoading = true;
        state.updateUserError = "";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateUserLoading = false;
        state.updateUserData = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUserLoading = false;
        state.updateUserData = action?.payload;
        state.updateUserError = action?.error.message;
      });
  },
});

const { actions, reducer: userReducer } = userSlice;

export default userReducer;
