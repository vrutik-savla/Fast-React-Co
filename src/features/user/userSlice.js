import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// 322. Redux Thunks With createAsyncThunk
// So let's just quickly recap what we did here. So this time we used the Redux Toolkit way of creating a Thunk function. So we called createAsyncThunk function right here where we passed in the action type name and so that's this one right here 'user/fetchAddress' which we will never manually use, but still Redux needs this internally. And then as a second argument, we pass in the actual Thunk function, so the code that we want to execute as soon as this action here will be dispatched. Now what's special about this is that this createAsyncThunk will basically produce three additional action types. So one for the pending promise state, one for the fulfilled state, and one for the rejected state. And so now we need to handle these cases separately back in our reducers and so this is how we then connect this Thunk with our reducers down here.
export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in.
    // Payload of the FULFILLED state
    return { position, address };
  },
);

// 313. Modeling the "User" State With Redux Toolkit
// 322. Redux Thunks With createAsyncThunk
// So just to quickly recap, here we created a slice of our global UI state. So by using this createSlice function here, we created a slice called user which has this initial state right here. And then we have a reducer which is this function that is responsible for updating the state object. So that function, in this case this updateName method here, receives the current state and the action. And then since we are using Redux Toolkit, we can directly mutate this state object and then set the "state.username" to the one that we receive as soon as we're going to dispatch the action. So that is then going to be "action.payload", but then inside "userSlice.actions", we will get access to the action creators. And so we then export it here as a named export, so that we can then use that here in our application and in particular probably here in this form. So here we will then update the name using this action creator qnd then we also export default, the "slice.reducer". And so let's now actually use this reducer to set up or store.
const initialState = {
  username: '',
  status: 'idle',
  position: {},
  address: '',
  error: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },

  // 322. Redux Thunks With createAsyncThunk
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = 'idle';
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error';
        state.error =
          'There was a problem getting in your address. Make sure to fill this filed!';
      }),
});
// console.log(userSlice);

export const { updateName } = userSlice.actions;
export default userSlice.reducer;

export const getUsername = (state) => state.user.username;
