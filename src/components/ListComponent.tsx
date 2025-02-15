import React from 'react';
import { List } from 'antd';
import ListItem from './ListItem';
import { useDispatch, useSelector } from 'react-redux';
import { getIssuesDone, getIssuesInProgress, getIssuesTodo } from '../app/features/issues/issuesSlice';
import { RootState } from '../app/store';



export default function ListComponent({ title, arr, listKey }: { title: string, arr: IssueT[], listKey: string }) {
    const dispatch = useDispatch();
    const repoUrl = useSelector((state: RootState) => state.repo.repoUrl);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.dataTransfer.setData('draggedItemIndex', index.toString());
        e.dataTransfer.setData('draggedListKey', listKey);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number | null) => {
        const draggedIndex = +e.dataTransfer.getData('draggedItemIndex');
        const draggedListKey = e.dataTransfer.getData('draggedListKey');

        if (!draggedListKey) {
            return;
        }

        const savedState = localStorage.getItem(repoUrl);
        const state = savedState ? JSON.parse(savedState) : { todo: [], inProgress: [], done: [] };
        const arrFromWhichDragged = state[draggedListKey];
        const currentArr = state[listKey];

        if (!arrFromWhichDragged || draggedIndex >= arrFromWhichDragged.length || !currentArr) {
            return;
        }

        const draggedItem = arrFromWhichDragged[draggedIndex];
        arrFromWhichDragged.splice(draggedIndex, 1);

        if (index !== null) {
            currentArr.splice(index, 0, draggedItem);
        } else {
            currentArr.push(draggedItem);
        }


        localStorage.setItem(repoUrl, JSON.stringify(state));

        dispatch(getIssuesTodo(state.todo));
        dispatch(getIssuesInProgress(state.inProgress));
        dispatch(getIssuesDone(state.done));
    };

    return (
        <div style={{ flex: 1, textAlign: 'center' }} onDragOver={handleDragOver} onDrop={(e) => {
            if (arr.length === 0) {
                handleDrop(e, null);
            }
        }}>
            <h2>
                {title}
            </h2>
            <List
                className='list'
                bordered
                dataSource={arr}
                renderItem={(item, index) => (
                    <div
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                    >
                        <ListItem
                            issue={item}
                        />
                    </div>
                )}
            />
        </div>
    );
}