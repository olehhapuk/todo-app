import { useState, useEffect } from 'react';
import { Container, Heading, useToast } from '@chakra-ui/react';

import TaskEditor from './TaskEditor';
import axios from 'axios';
import TaskList from './TaskList';

function App() {
  const [tasks, setTasks] = useState([]);

  const toast = useToast();

  useEffect(() => {
    axios
      .get('/tasks')
      .then((res) => setTasks(res.data))
      .catch((error) => {
        toast({
          title: 'Failed to fetch task',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        console.error(error);
      });
  }, []);

  function createTask(taskData) {
    axios
      .post('/tasks', taskData)
      .then((res) => {
        setTasks((prev) => [...prev, res.data]);
        toast({
          title: `Task created successfully`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: 'Failed to create task',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        console.error(error);
      });
  }

  function editTask(taskId, taskData) {
    axios
      .put(`/tasks/${taskId}`, taskData)
      .then((res) => {
        setTasks((prev) =>
          prev.map((task) => (task._id === taskId ? res.data : task))
        );
        toast({
          title: `Task updated successfully`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: 'Failed to edit task',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        console.error(error);
      });
  }

  function deleteTask(taskId) {
    axios
      .delete(`/tasks/${taskId}`)
      .then(() => {
        setTasks((prev) => prev.filter((task) => task._id !== taskId));
        toast({
          title: `Task deleted successfully`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: 'Failed to delete task',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        console.error(error);
      });
  }

  return (
    <Container>
      <Heading size="lg" mt={5} mb={3}>
        My Todos
      </Heading>
      <TaskEditor onCreate={createTask} />
      <TaskList tasks={tasks} onEdit={editTask} onDelete={deleteTask} />
    </Container>
  );
}

export default App;
