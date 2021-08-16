import MeetupSingle from '../../components/meetups/MeetupSingle';
import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head'

const SingleMeetUpPage = (props) => {
  return (
    <>
    <Head>
      <title>React Meetups | {props.meetupData.title}</title>
      <meta name='description' content={props.meetupData.description}/>
    </Head>
    <MeetupSingle
      image={props.meetupData.image}
      title={props.meetupData.title}
      description={props.meetupData.description}
      address={props.meetupData.address}
    />
    </>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://admin-thomas:Bigcoolpigs07@cluster0.9dx6p.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupCollections = db.collection('meetups');

  const meetups = await meetupCollections.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    'mongodb+srv://admin-thomas:Bigcoolpigs07@cluster0.9dx6p.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupCollections = db.collection('meetups');

  const selectedMeetup = await meetupCollections.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        description: selectedMeetup.description,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
      },
    },
  };
}

export default SingleMeetUpPage;
