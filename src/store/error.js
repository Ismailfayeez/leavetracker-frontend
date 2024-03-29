import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  errorResponse: '',
  displayErrorModal: false
};
const slice = createSlice({
  name: 'error',
  initialState: {
    ...initialState
  },
  reducers: {
    apiErrorReceived: (error, action) => {
      const { status, data } = action.payload;
      error.errorResponse = { status, data };
    },
    openErrorModal: (error) => {
      error.displayErrorModal = true;
    },
    closeErrorModal: (error) => {
      error.errorResponse = '';
      error.displayErrorModal = false;
    },
    clearError: (error) => {
      error.errorResponse = '';
    }
  }
});

export const { apiErrorReceived, openErrorModal, closeErrorModal, clearError } = slice.actions;
export default slice.reducer;
