// migrate-interests.js
const { MongoClient } = require('mongodb');

const SOURCE_URI = 'mongodb+srv://manishkumar:TF31hbCM5hRjot88@cluster0.x4ikvem.mongodb.net/asian-embrace-dbs';
const TARGET_URI = 'mongodb+srv://admin:Appexoft12@cluster0.4ng9b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const DB_NAME = 'test';
const COLLECTION_NAME = 'interests';

async function migrate() {
  const sourceClient = new MongoClient(SOURCE_URI);
  const targetClient = new MongoClient(TARGET_URI);

  try {
    await sourceClient.connect();
    await targetClient.connect();

    const sourceDb = sourceClient.db("asian-embrace-dbs");
    const targetDb = targetClient.db(DB_NAME);

    const interests = await sourceDb.collection(COLLECTION_NAME).find({}).toArray();

    if (!interests.length) {
      console.log('No interests found in source DB.');
      // Вивести всі колекції у базі
      const collections = await sourceDb.listCollections().toArray();
      if (!collections.length) {
        console.log('No collections found in source DB asian-embrace-dbs.');
      } else {
        console.log('Collections in source DB:');
        for (const col of collections) {
          const count = await sourceDb.collection(col.name).countDocuments();
          console.log(` - ${col.name} (documents: ${count})`);
        }
      }
      return;
    }

    // Видаляємо всі попередні interests у цільовій БД (опціонально)
    // await targetDb.collection(COLLECTION_NAME).deleteMany({});

    // Вставляємо нові дані
    await targetDb.collection(COLLECTION_NAME).insertMany(interests);

    console.log(`Migrated ${interests.length} interests.`);
  } catch (err) {
    console.error('Migration error:', err);
  } finally {
    await sourceClient.close();
    await targetClient.close();
  }
}

migrate();