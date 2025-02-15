import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ListComponent from './ListComponent';
import '@testing-library/jest-dom';

const mockStore = configureStore();
const store = mockStore({
    repo: { repoUrl: 'test-repo' },
    issues: { todo: [], inProgress: [], done: [] }
});

const mockIssues = [
    { id: 1, title: 'Issue 1', state: 'open', assignee: false, number: 1488, commentsUrl: 'https://localhost:3000', repository_url: 'http://localhost:3000', created_at: new Date },
    { id: 2, title: 'Issue 2', state: 'open', assignee: false, number: 1489, commentsUrl: 'https://localhost:3000', repository_url: 'http://localhost:3000', created_at: new Date }
];

describe('ListComponent', () => {
    it('renders title and list items', () => {
        render(
            <Provider store={store}>
                <ListComponent title="Todo" arr={mockIssues} listKey="todo" />
            </Provider>
        );

        expect(screen.getByText(/todo/i)).toBeInTheDocument();
        expect(screen.getByText('Issue 1')).toBeInTheDocument();
        expect(screen.getByText('Issue 2')).toBeInTheDocument();
    });
});
