import { configureStore } from '@reduxjs/toolkit'
import { issuesSlice } from './features/issues/issuesSlice'
import { repoSlice } from './features/repo/repoSlice'

export const store = configureStore({
  reducer: {
    issues: issuesSlice.reducer,
    repo: repoSlice.reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch