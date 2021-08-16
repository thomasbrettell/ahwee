// api/new-meetup
import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;

    // const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      'mongodb+srv://admin-thomas:Bigcoolpigs07@cluster0.9dx6p.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    const db = client.db();

    const meetupCollections = db.collection('meetups');

    const result = await meetupCollections.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: 'Meetup inserted!' });
  }
};

export default handler;
