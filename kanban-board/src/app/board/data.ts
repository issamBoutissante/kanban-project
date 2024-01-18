import { Task } from '../models/task.model';

export let kanbanData: Task[] = [
  {
    id: 1,
    title: 'Task - 29001',
    status: 'Open',
    summary: 'Analyze the new requirements gathered from the customer.',
    boardId: 1, // Assuming all these tasks are for board with id 1
  },
  {
    id: 2,
    title: 'Task - 29002',
    status: 'InProgress',
    summary: 'Improve application performance',
    boardId: 1,
  },
  {
    id: 3,
    title: 'Task - 29003',
    status: 'Open',
    summary: 'Arrange a web meeting with the customer to get new requirements.',
    boardId: 1,
  },
];
