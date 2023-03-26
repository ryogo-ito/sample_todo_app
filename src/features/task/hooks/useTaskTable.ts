import { useEffect, useState } from 'react';
import { Todo } from '../types';
import { callGetTaskList } from '../api/getTodoList';

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
    },
  };
};
