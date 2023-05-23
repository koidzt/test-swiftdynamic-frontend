import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormStateProps } from './formSlice';

export interface TableFormStateProps extends FormStateProps {
  key: string;
}

const initialState: TableFormStateProps[] = [];

const tableFormSlice = createSlice({
  name: 'tableForm',
  initialState,
  reducers: {
    editTable: (state, action: PayloadAction<TableFormStateProps[]>) => {
      state = action.payload;

      return state;
    },
  },
});

export const { editTable } = tableFormSlice.actions;
export default tableFormSlice.reducer;
