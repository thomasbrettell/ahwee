import { useRouter } from 'next/router';
import Head from 'next/head';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
  const router = useRouter();

  const addMeetupHandler = async (newMeetup) => {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(newMeetup),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Add a new Meetup</title>
        <meta name="description" content="Add a new meetup here" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetupPage;
