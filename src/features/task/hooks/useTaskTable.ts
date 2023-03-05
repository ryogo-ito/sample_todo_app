import { ChangeEvent, useEffect, useState } from 'react';
import { addDoc, collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../../../firebase';
import { callDeleteTodoList } from '../api/deleteTodoList';
import { TaskBase } from '../types';

export const useTaskTable = () => {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState<TaskBase[]>([]);

  // const navigate = useNavigate();

  const fetchTasksCollection = async () => {
    await getDocs(collection(db, 'tasks')).then((snapShot) => {
      setTasks(
        snapShot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          complete: doc.data().complete,
          createdAt: doc.data().createdAt.toDate(),
          updatedAt: doc.data().updatedAt.toDate(),
        })),
      );
    });
  };

  useEffect(() => {
    (async () => {
      await fetchTasksCollection();
    })();
  }, []);

  const handleInputTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCreateTodoButtonClick = async () => {
    // const { todos: createdTodos, error } = await callCreateTodo(input);
    // if (error != null) {
    //   return;
    // }
    //
    // setTodos(createdTodos);

    await addDoc(collection(db, 'tasks'), {
      title: input,
      description: '',
      complete: false,
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
    });

    setInput('');
  };

  const handleDeleteTodoButtonClick = async (id: string) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { todos, error } = await callDeleteTodoList(id);

    if (error != null) {
      return;
    }

    setTasks(todos);
  };

  const handleCompleteTodoCheckChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    setTasks(
      tasks.map((currentTodo) => {
        if (currentTodo.id === id) {
          currentTodo.complete = e.target.checked;
        }

        return currentTodo;
      }),
    );
  };

  return {
    state: {
      input,
      tasks,
    },
    handlers: {
      handleDeleteTodoButtonClick,
      handleCompleteTodoCheckChange,
      handleCreateTodoButtonClick,
      handleInputTodoChange,
    },
  };
};
