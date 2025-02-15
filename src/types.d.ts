interface IssueT {
    id: number;
    state: string;
    assignee: boolean;
    url: string;
    title: string;
    number: number;
    commentsUrl: string;
    repository_url: string;
    created_at: Date;
}