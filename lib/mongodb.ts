import { MongoClient, Db, Collection } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db('userdata');
}

export async function getEmailsCollection(): Promise<Collection> {
  const db = await getDatabase();
  return db.collection('emails');
}

export interface EmailRecord {
  _id?: string;
  email: string;
  archetype: string;
  created_at: Date;
}

// Save email to MongoDB
export async function saveEmail(email: string, archetype: string) {
  try {
    const collection = await getEmailsCollection();
    
    const result = await collection.insertOne({
      email,
      archetype,
      created_at: new Date(),
    });
    
    console.log('✅ Email saved to MongoDB:', result.insertedId);
    return { success: true, data: { id: result.insertedId, email, archetype } };
  } catch (error) {
    console.error('❌ Error saving email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Get all emails
export async function getAllEmails() {
  try {
    const collection = await getEmailsCollection();
    const emails = await collection.find({}).sort({ created_at: -1 }).toArray();
    return { success: true, data: emails };
  } catch (error) {
    console.error('❌ Error fetching emails:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error', data: [] };
  }
}

// Get emails by archetype
export async function getEmailsByArchetype(archetype: string) {
  try {
    const collection = await getEmailsCollection();
    const emails = await collection.find({ archetype }).sort({ created_at: -1 }).toArray();
    return { success: true, data: emails };
  } catch (error) {
    console.error('❌ Error fetching emails by archetype:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error', data: [] };
  }
}

// Get email count by archetype
export async function getEmailCounts() {
  try {
    const collection = await getEmailsCollection();
    const pipeline = [
      {
        $group: {
          _id: '$archetype',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ];
    const counts = await collection.aggregate(pipeline).toArray();
    
    // Transform to match expected format
    const formatted = counts.map(item => ({
      archetype: item._id,
      count: item.count.toString()
    }));
    
    return { success: true, data: formatted };
  } catch (error) {
    console.error('❌ Error fetching email counts:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error', data: [] };
  }
}

// Get total email count
export async function getTotalEmailCount() {
  try {
    const collection = await getEmailsCollection();
    const count = await collection.countDocuments();
    return { success: true, count };
  } catch (error) {
    console.error('❌ Error fetching total count:', error);
    return { success: false, count: 0 };
  }
}

