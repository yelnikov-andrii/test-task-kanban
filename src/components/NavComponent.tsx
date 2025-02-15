import { Breadcrumb } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'


export default function NavComponent() {
    const issues = useSelector((state: RootState) => state.issues.allIssues);
    const issue = issues[0];

    if (!issue) {
        return null;
    }

    const repositoryUrl = issue?.repository_url.replace("https://api.github.com/repos/", "https://github.com/");

    const [owner, repo] = repositoryUrl.replace("https://github.com/", "").split("/");
    const repoName = repo[0].toUpperCase() + repo.slice(1);
    const ownerName = owner[0].toUpperCase() + owner.slice(1);

    const ownerUrl = `https://github.com/${owner}`;

    return (
        <Breadcrumb separator=">">
            <Breadcrumb.Item>
                <a href={repositoryUrl} target='_blank'>
                    {repoName}
                </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <a href={ownerUrl} target='_blank'>
                    {ownerName}
                </a>
            </Breadcrumb.Item>
        </Breadcrumb>
    )
}