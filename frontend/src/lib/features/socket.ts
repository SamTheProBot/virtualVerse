//import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//import { RootState } from '../store';
//import { Socket } from 'socket.io-client';
//
//interface SocketState {
//  socket: Socket | null;
//}
//
//const initialState: SocketState = {
//  socket: null,
//};
//
//export const socketSlice = createSlice({
//  name: 'socketProvider',
//  initialState,
//  reducers: {
//    setSocket: (state, action: PayloadAction<Socket>) => {
//      // state.socket = action.payload;
//    },
//    disconnectSocket: (state) => {
//      state.socket?.disconnect();
//      state.socket = null;
//    },
//  },
//});
//
//export const { setSocket, disconnectSocket } = socketSlice.actions;
//
//export const selectSocket = (state: RootState) => state.socketProvider.socket;
//export default socketSlice.reducer;
