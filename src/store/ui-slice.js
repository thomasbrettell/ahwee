import {createSlice} from '@reduxjs/toolkit'

const UISlice = createSlice({
  name: 'UI',
  initialState: {
    notification: null
  },
  reducers: {
    setNotification(state, action) {
      state.notification = action.payload
    }
  }
})

export const UIActions = UISlice.actions

export default UISlice.reducer