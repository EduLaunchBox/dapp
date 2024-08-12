"use client";
import { configureStore } from "@reduxjs/toolkit";
import createTokenReducer from "./slice/createToken";
import migrateTokenReducer from "./slice/migrateToken";

export const store = configureStore({
  reducer: {
    createToken: createTokenReducer,
    migrateToken: migrateTokenReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
