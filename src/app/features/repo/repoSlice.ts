import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface RepoState {
    repoUrl: string;
}

const initialState: RepoState = {
    repoUrl: ''
};

export const repoSlice = createSlice({
    name: 'repo',
    initialState,
    reducers: {
        getRepoUrl: (state: RepoState, action: PayloadAction<string>) => {
            state.repoUrl = action.payload;
        }
    },
});


export const { getRepoUrl } = repoSlice.actions;

export default repoSlice.reducer;