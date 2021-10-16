import { Stack } from '@chakra-ui/react';

import TaskCard from './TaskCard';

function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <Stack>
      {tasks.map((task) => (
        <TaskCard key={task.id} {...task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </Stack>
  );
}

export default TaskList;
