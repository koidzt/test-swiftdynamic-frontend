import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormStateProps } from './formSlice';

export interface TableFormStateProps extends FormStateProps {
  key: string;
}

const cacheState = localStorage.getItem('tableFormSwiftDynamic')
  ? JSON.parse(localStorage.getItem('tableFormSwiftDynamic')!)
  : [];

const initialState: TableFormStateProps[] = cacheState;

const tableFormSlice = createSlice({
  name: 'tableForm',
  initialState,
  reducers: {
    editTable: (state, action: PayloadAction<TableFormStateProps[]>) => {
      state = action.payload;

      localStorage.setItem('tableFormSwiftDynamic', JSON.stringify(state));

      return state;
    },
  },
});

export const { editTable } = tableFormSlice.actions;
export default tableFormSlice.reducer;
