import { Button, Flex, Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { getIssues, getIssuesFinally, getIssuesDone, getIssuesInProgress, getIssuesTodo, setIssuesSearched, getAllIssues } from "../app/features/issues/issuesSlice";
import { getRepoUrl } from "../app/features/repo/repoSlice";

export default function FormComponent() {
    const [form] = Form.useForm();
    const issuesLoading = useSelector((state: RootState) => state.issues.issuesLoading);
    const dispatch = useDispatch();

    const fetchRepoFromGithub = async (repoUrl: string) => {
        try {
            const savedState = localStorage.getItem(repoUrl);

            if (savedState) {
                const issues = JSON.parse(savedState);
                dispatch(getIssuesDone(issues.done));
                dispatch(getIssuesInProgress(issues.inProgress));
                dispatch(getIssuesTodo(issues.todo));
                dispatch(getAllIssues([...issues.todo, ...issues.inProgress, ...issues.done]))
                message.success("Loaded issues from local storage");
                return;
            }

            dispatch(getIssues());
            const response = await fetch(repoUrl);

            if (!response.ok) {
                throw new Error("Error fetching github api");
            }

            const data = await response.json();

            dispatch(getAllIssues(data));

            const todoIssues = data.filter((issue: IssueT) => issue.state === "open" && !issue.assignee);
            const inProgressIssues = data.filter((issue: IssueT) => issue.state === "open" && issue.assignee);
            const doneIssues = data.filter((issue: IssueT) => issue.state === "closed");

            dispatch(getIssuesTodo(todoIssues));
            dispatch(getIssuesInProgress(inProgressIssues));
            dispatch(getIssuesDone(doneIssues));

            localStorage.setItem(repoUrl, JSON.stringify({ todo: todoIssues, inProgress: inProgressIssues, done: doneIssues }));
            message.success("Successfully fetched repository");
        } catch (error) {
            form.setFields([
                {
                    name: "repoUrl",
                    errors: [error instanceof Error ? error.message : "Unknown error"],
                },
            ]);
        } finally {
            dispatch(getIssuesFinally());
            dispatch(setIssuesSearched());
        }
    };

    const handleFinish = (values: { repoUrl: string }) => {
        const [owner, repo] = values.repoUrl.split('/').slice(-2);
        const repoUrl = `https://api.github.com/repos/${owner}/${repo}/issues`;
        dispatch(getRepoUrl(repoUrl));
        fetchRepoFromGithub(repoUrl);
    };

    return (
        <Flex vertical gap={2}>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', width: '100%' }}
            >
                <Form.Item
                    name="repoUrl"
                    rules={[{ required: true, message: "Please enter repository url" }, {
                        validator: (_, value) =>
                            value && !value.match(/^https:\/\/github\.com\/[^/]+\/[^/]+$/)
                                ? Promise.reject(new Error("Invalid github url!"))
                                : Promise.resolve(),
                    },]}
                    style={{ flex: 1 }}
                >
                    <Input placeholder="Enter repo url" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={issuesLoading} block>
                        Load issues
                    </Button>
                </Form.Item>
            </Form>
        </Flex >
    );
}
