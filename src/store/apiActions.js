import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan=createAction("api/CallBegan")
export const apiCallSuccess=createAction("api/CallSuccess")
export const apiCallFailure=createAction("api/CallFailure")