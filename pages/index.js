import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Meetups and stuff" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// export async function getServerSideProps (context) {
//   const req = context.req
//   const res = context.res

//   return {
//     props: {
//       meetups: DUMMY_MEETUP
//     }
//   }
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    'mongodb+srv://admin-thomas:Bigcoolpigs07@cluster0.9dx6p.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupCollections = db.collection('meetups');

  const meetups = await meetupCollections.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        description: meetup.description,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
