import { List } from 'antd';


export default function ListItem({ issue }: { issue: IssueT }) {
    const daysAgo = Math.floor((Date.now() - new Date(issue.created_at).getTime()) / (24 * 60 * 60 * 1000));
    console.log(issue)

    return (
        <List.Item style={{ display: 'flex', marginBottom: '16px', flexDirection: 'column', gap: 2, alignItems: 'flex-start', padding: '8px', border: '1px solid black', borderRadius: '8px', background: '#fff', cursor: 'pointer' }}>
            <h2 style={{ fontSize: '16px' }}>
                {issue.title}
            </h2>
            <p>
                {`#${issue.number} opened ${daysAgo} days ago`}
            </p>
            <p style={{ display: 'flex', gap: '8px', alignItems: 'center'}}>
                <span>{issue.user.type}</span>
                <span>|</span>
                <span>Comments: {issue.comments}</span>
            </p>
        </List.Item>
    );
};