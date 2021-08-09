import useHttp from '../../hooks/use-http';
import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  let task = ''

  const returnTask = (newTask) => {
    const generatedId = newTask.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: task };

    props.onAddTask(createdTask);
  }

  const {isLoading, error, sendRequest} = useHttp(returnTask);

  const enterTaskHandler = async (taskText) => {
    sendRequest({
      url: 'https://react-http-learning-e8ee3-default-rtdb.firebaseio.com/tasks.json',
      body:{ text: taskText },
      method: 'POST',
      header: {'Content-Type': 'application/json'}
    })

    task = taskText
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
