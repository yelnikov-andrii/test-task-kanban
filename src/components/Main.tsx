import React from 'react'
import ListComponent from './ListComponent'
import { Flex, Typography } from 'antd'
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';


export default function Main() {
    const issuesTodo = useSelector((state: RootState) => state.issues.issuesTodo);
    const issuesInProgress = useSelector((state: RootState) => state.issues.issuesInProgress);
    const issuesDone = useSelector((state: RootState) => state.issues.issuesDone);
    const allIssues = useSelector((state: RootState) => state.issues.allIssues);

    const issuesSearched = useSelector((state: RootState) => state.issues.issuesWereSearched);


    return (
        <main className='main'>
            {issuesSearched && (
                allIssues.length ? (
                    <Flex justify='space-between' gap={16}>
                        <ListComponent title="Todo" listKey="todo" arr={issuesTodo} />
                        <ListComponent title="In progress" listKey="inProgress" arr={issuesInProgress} />
                        <ListComponent title="Done" listKey="done" arr={issuesDone} />
                    </Flex>
                ) : (
                    <Typography>
                        Issues haven't been found
                    </Typography>
                )
            )}
        </main>
    )
}