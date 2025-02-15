import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Main from './Main';
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';

const mockState = {
    issues: {
        issuesTodo: [{ id: 1, title: 'Some issue', state: 'open', assignee: false, number: 1488, commentsUrl: 'https://localhost:3000', repository_url: 'http://localhost:3000', created_at: new Date }],
        issuesInProgress: [{ id: 2, title: 'Some issue 2', state: 'open', assignee: true, number: 1489, commentsUrl: 'https://localhost:3000', repository_url: 'http://localhost:3000', created_at: new Date }],
        issuesDone: [{ id: 3, title: 'Some issue 3', state: 'closed', assignee: false, number: 1490, commentsUrl: 'https://localhost:3000', repository_url: 'http://localhost:3000', created_at: new Date }],
        allIssues: [{ id: 1, title: 'Some issue', state: 'open', assignee: false, number: 1488, commentsUrl: 'https://localhost:3000', repository_url: 'http://localhost:3000', created_at: new Date }, { id: 2, title: 'Some issue 2', state: 'open', assignee: true, number: 1489, commentsUrl: 'https://localhost:3000', repository_url: 'http://localhost:3000', created_at: new Date }, { id: 3, title: 'Some issue 3', state: 'closed', assignee: false, number: 1490, commentsUrl: 'https://localhost:3000', repository_url: 'http://localhost:3000', created_at: new Date }],
        issuesWereSearched: true
    },
    repo: {
        repoUrl: 'http://localhost:3000'
    }
};

const store = createStore((state = mockState) => state);

describe('Main component', () => {
    it('renders without crashing', () => {
        render(
            <Provider store={store}>
                <Main />
            </Provider>
        );
        expect(screen.getByText(/Todo/i)).toBeInTheDocument();
        expect(screen.getByText(/In progress/i)).toBeInTheDocument();
        expect(screen.getByText(/Done/i)).toBeInTheDocument();
    });

    it('renders message when no issues are found', () => {
        const emptyState = {
            issues: {
                issuesTodo: [],
                issuesInProgress: [],
                issuesDone: [],
                allIssues: [],
                issuesWereSearched: true
            },
            repo: {
                repoUrl: 'http://localhost:3000'
            }
        };

        const emptyStore = createStore((state = emptyState) => state);

        render(
            <Provider store={emptyStore}>
                <Main />
            </Provider>
        );
        expect(screen.getByText('Issues haven\'t been found')).toBeInTheDocument();
    });

    it('does not render the lists when issuesWereSearched is false', () => {
        const falseSearchState = { ...mockState, issues: { ...mockState.issues, issuesWereSearched: false } };

        const falseSearchStore = createStore((state = falseSearchState) => state);

        render(
            <Provider store={falseSearchStore}>
                <Main />
            </Provider>
        );

        expect(screen.queryByText(/Todo/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/In progress/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Done/i)).not.toBeInTheDocument();
    });
});
