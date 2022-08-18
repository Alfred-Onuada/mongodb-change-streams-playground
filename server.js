require('dotenv').config();
const { MongoClient } = require('mongodb');

const DB_URI = process.env.DB_URI;

const client = new MongoClient(DB_URI);

(async () => {
  try {
    await client.connect();

    const db = client.db('sample_airbnb');
    const listingsAndReview = db.collection('listingsAndReviews');

    const changeStream = listingsAndReview.watch();

    console.log('Listening for Insert, Update and Delete Operations');
    changeStream.on('change', next => {
      // fun code for insert
      if (next.operationType === 'insert') {
        console.log(`Hey!! Something change, someone inserted \n ${JSON.stringify(next.fullDocument)}`);
        return;
      }

      // fun code for delete
      if (next.operationType === 'delete') {
        console.log(`Hey wahala, person don delete something oo`);
        return;
      }

      // fun code for update 
      if (next.operationType === 'update') {
        console.log(`Hey an update just occured`);
        return;
      }
      
    })
  } catch (error) {
    console.log(error)
  }
})()