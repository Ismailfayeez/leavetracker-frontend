import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'myProfile',
  initialState: {
    approvers: [],
    accounts: []
  },
  reducers: {
    accountsReceived: (myProfile, action) => {
      const { data } = action.payload;
      myProfile.accounts = data;
    }
  }
});
export const { approversReceived, approverRemoved, accountsReceived } = slice.actions;
export default slice.reducer;

// export const loadApprovers=(config)=>(dispatch)=>{
//     return dispatch(apiCallBegan({
//         url:config.url.common,
//         onSuccess:approversReceived.type
//     }))
// }

// export const addApprovers=(config,data)=>(dispatch)=>{
//     return dispatch(apiCallBegan({
//         url:config.url.common,
//         method:'post',
//         data
//     }))
// }

// export const removeApprover=(config)=>(dispatch)=>{
//     return dispatch(apiCallBegan({
//         url:config.url.common,
//         onSuccess:approverRemoved.type,
//         method:'delete',
//         context:config.approverId
//     }))
// }
