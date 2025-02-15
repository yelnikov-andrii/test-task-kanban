interface IssueT {
    id: number;
    state: string;
    assignee: boolean;
    title: string;
    number: number;
    commentsUrl: string;
    repository_url: string;
    created_at: Date;
    comments: number;
    user: {
        type: string;
    }
}