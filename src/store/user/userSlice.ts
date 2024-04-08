import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/repo.type';

type UserState ={
    currentUser: User | null,
}


const initialState: UserState = {
    currentUser: null, 
}

const userSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;