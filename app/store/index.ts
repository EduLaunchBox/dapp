"use client";
import { configureStore } from "@reduxjs/toolkit";
import createTokenReducer from "./slice/createToken";
import migrateTokenReducer from "./slice/migrateToken";
import generalAppReducer from "./slice/appSlice";

export const store = configureStore({
  reducer: {
    createToken: createTokenReducer,
    migrateToken: migrateTokenReducer,
    app: generalAppReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
