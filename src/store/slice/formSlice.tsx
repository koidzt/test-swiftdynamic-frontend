import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dayjs } from 'dayjs';

interface FormStateProps {
  titleName: string | null;
  name: string;
  surname: string;
  birthday: Dayjs | string | null;
  nationality: string | null;
  idNo: {
    idNo1: string;
    idNo2: string;
    idNo3: string;
    idNo4: string;
    idNo5: string;
  };
  gender: string;
  phoneNo: string;
  phonePrefix: string;
  passportNo?: string;
  expectedSalary: string;
}

export const initialFormState: FormStateProps = {
  titleName: null,
  name: '',
  surname: '',
  birthday: null,
  nationality: null,
  idNo: {
    idNo1: '',
    idNo2: '',
    idNo3: '',
    idNo4: '',
    idNo5: '',
  },
  gender: '',
  phoneNo: '',
  phonePrefix: '',
  passportNo: '',
  expectedSalary: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState: initialFormState,
  reducers: {
    changeValues(state, actions: PayloadAction<any>) {
      console.log(actions);
      state = { ...state, ...actions.payload };

      return state;
    },

    clearForm(state) {
      state = { ...state, ...initialFormState };
      return state;
    },
  },
});

export const { changeValues, clearForm } = formSlice.actions;

export default formSlice.reducer;
