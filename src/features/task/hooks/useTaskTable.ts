import { useEffect, useState } from 'react';
import { Todo } from '../types';
import { callGetTaskList } from '../api/getTodoList';
import { callCreateTodo } from '../api/createTodo';
import { callUpdateTodoComplete } from '../api/updateTodo';
import { callDeleteTodoList } from '../api/deleteTodoList';

export const useTaskTable = () => {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    const { todos, error } = await callGetTaskList();

    if (error) {
      return;
    }

    setTodos(todos);
  };

  const handleInputTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCreateTodoButtonClick = async () => {
    const { error } = await callCreateTodo(input);

    if (error) {
      return;
    }

    await fetchTodos();
    setInput('');
  };

  const handleUpdateTodoCheckboxChange = async (id: string) => {
    const { error } = await callUpdateTodoComplete(id);

    if (error) {
      return;
    }

    await fetchTodos();
  };

  const handleDeleteTodoButtonClick = async (id: string) => {
    const { error: error2 } = await callDeleteTodoList(id);

    if (error2) {
      return;
    }

    await fetchTodos();
  };

  useEffect(() => {
    (async () => {
      await fetchTodos();
    })();
  }, []);

  return {
    state: {
      input,
      todos,
    },
    handlers: {
      handleInputTodoChange,
      handleCreateTodoButtonClick,
      handleUpdateTodoCheckboxChange,
      handleDeleteTodoButtonClick,
    },
  };
};
