import {configureStore} from "@reduxjs/toolkit";
import { createLogger } from 'redux-logger';
import systemReducer from "./system.slice"

const middlewares = [];

if (process.env.NODE_ENV === `development`) {
    middlewares.push(createLogger({ collapsed: true }));
}

export const store = configureStore({
    reducer: {
        system: systemReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;