import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IssuesState {
    issuesTodo: IssueT[];
    issuesInProgress: IssueT[];
    issuesDone: IssueT[];
    issuesLoading: boolean;
    issuesWereSearched: boolean;
    allIssues: IssueT[];
}

const initialState: IssuesState = {
    issuesTodo: [],
    issuesInProgress: [],
    issuesDone: [],
    issuesLoading: false,
    issuesWereSearched: false,
    allIssues: [],
};

export const issuesSlice = createSlice({
    name: 'issues',
    initialState,
    reducers: {
        getIssues: (state: IssuesState) => {
            state.issuesLoading = true;
        },
        getAllIssues: (state: IssuesState, action: PayloadAction<IssueT[]>) => {
            state.allIssues = action.payload;
        },
        getIssuesTodo: (state: IssuesState, action: PayloadAction<IssueT[]>) => {
            state.issuesTodo = action.payload;
        },
        getIssuesInProgress: (state: IssuesState, action: PayloadAction<IssueT[]>) => {
            state.issuesInProgress = action.payload;
        },
        getIssuesDone: (state: IssuesState, action: PayloadAction<IssueT[]>) => {
            state.issuesDone = action.payload;
        },
        getIssuesFinally: (state: IssuesState) => {
            state.issuesLoading = false;
        },
        setIssuesSearched: (state: IssuesState) => {
            state.issuesWereSearched = true;
        }
    },
});


export const { getIssues, getAllIssues, getIssuesTodo, getIssuesInProgress, getIssuesDone, getIssuesFinally, setIssuesSearched } = issuesSlice.actions;

export default issuesSlice.reducer;