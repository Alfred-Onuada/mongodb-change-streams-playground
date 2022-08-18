require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const fs = require('fs');

const DB_URI = process.env.DB_URI;

const client = new MongoClient(DB_URI);

(async () => {
  try {
    await client.connect();

    const db = client.db('sample_airbnb');
    const listingsAndReview = db.collection('listingsAndReviews');

    const command = process.argv[2];
    
    if (command === 'insert') {
      const documentPath = process?.argv[3] || null;

      if (!fs.existsSync('./' + documentPath)) {
        console.log('Invalid path');
        return;
      }

      const document = require('./' + documentPath);
      if (typeof document != 'object') {
        console.log('You need to specify a document to insert');
        return;
      }

      await listingsAndReview.insertOne(document);
      console.log('Inserted, check the stream terminal');
      return;
    }

    if (command === 'update') {
      const documentId = process?.argv[3] || null;
      const documentPath = process?.argv[4] || null;

      if (!fs.existsSync('./' + documentPath)) {
        console.log('Invalid path');
        return;
      }

      const document = require('./' + documentPath);

      if (!ObjectId.isValid(documentId)) {
        console.log('You need a valid document id');
        return;
      }

      if (typeof document !== 'object') {
        console.log('You need a valid JSON object');
        return;
      }

      const updateInfo = await listingsAndReview.updateOne({ _id: ObjectId(documentId) }, { $set: document });

      if (updateInfo.modifiedCount === 0) {
        console.log('Could find that document mate');
        return;
      }

      console.log('Update was a success, t for thanks');
      return;
    }

    if (command === 'delete') {
      const documentId = process?.argv[3] || null;

      if (!ObjectId.isValid(documentId)) {
        console.log('You need a valid document id');
        return;
      }

      const deleteInfo = await listingsAndReview.deleteOne({ _id: ObjectId(documentId) });

      if (deleteInfo.deletedCount == 0) {
        console.log('Sorry mate, couldn\'t find that document');
        return;
      }

      console.log('Deleted, check the stream terminal');
      return;
    }

  } catch (error) {
    console.log(error)
  } finally {
    await client.close();
  }
})()