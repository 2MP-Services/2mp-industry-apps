const fs = require('fs');
const csv = require('csv-parser');
const { Client } = require('pg');

// Database configuration
const dbConfig = {
  user: 'rh_user', // Replace with your PostgreSQL username
  host: 'localhost',      // Replace with your PostgreSQL host
  database: 'rh_db', // Replace with your database name
  password: 'password123', // Replace with your PostgreSQL password
  port: 5432,             // Default PostgreSQL port
};

const client = new Client(dbConfig);

// Connect to the database
client.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Database connection error:', err));

// Function to insert or retrieve wilaya ID
async function getOrCreateWilaya(name) {
  const query = `
    INSERT INTO "Wilayas" (name, "createdAt", "updatedAt")
    VALUES ($1, NOW(), NOW())
    ON CONFLICT (name) DO NOTHING
    RETURNING id;
  `;
  const result = await client.query(query, [name]);
  if (result.rows.length > 0) {
    return result.rows[0].id; // Return newly created ID
  }
  // If no rows returned, fetch the existing ID
  const selectQuery = 'SELECT id FROM "Wilayas" WHERE name = $1';
  const selectResult = await client.query(selectQuery, [name]);
  return selectResult.rows[0].id;
}

// Function to insert or retrieve daira ID
async function getOrCreateDaira(name, wilayaId) {
  const query = `
    INSERT INTO "Dairas" (name, wilaya_id, "createdAt", "updatedAt")
    VALUES ($1, $2, NOW(), NOW())
    ON CONFLICT (name, wilaya_id) DO NOTHING
    RETURNING id;
  `;
  const result = await client.query(query, [name, wilayaId]);
  if (result.rows.length > 0) {
    return result.rows[0].id; // Return newly created ID
  }
  // If no rows returned, fetch the existing ID
  const selectQuery = 'SELECT id FROM "Dairas" WHERE name = $1 AND wilaya_id = $2';
  const selectResult = await client.query(selectQuery, [name, wilayaId]);
  return selectResult.rows[0].id;
}

// Function to insert commune
async function createCommune(name, dairaId) {
  const query = `
    INSERT INTO "Communes" (name, daira_id, "createdAt", "updatedAt")
    VALUES ($1, $2, NOW(), NOW())
    ON CONFLICT (name, daira_id) DO NOTHING;
  `;
  await client.query(query, [name, dairaId]);
}

// Process the CSV file
async function processCSV(filePath) {
  try {
    const stream = fs.createReadStream(filePath).pipe(csv());

    for await (const row of stream) {
      const { id, commune_name_ascii, daira_name_ascii, wilaya_name_ascii } = row;

      // Step 1: Insert or retrieve wilaya ID
      const wilayaId = await getOrCreateWilaya(wilaya_name_ascii);

      // Step 2: Insert or retrieve daira ID
      const dairaId = await getOrCreateDaira(daira_name_ascii, wilayaId);

      // Step 3: Insert commune
      await createCommune(commune_name_ascii, dairaId);

      console.log(`Processed row: ${id} - ${commune_name_ascii}`);
    }

    console.log('CSV processing completed successfully.');
  } catch (error) {
    console.error('Error processing CSV:', error);
  } finally {
    // Close the database connection
    await client.end();
    console.log('Database connection closed.');
  }
}

// Path to your CSV file
const filePath = './data.csv'; // Replace with the actual path to your CSV file

// Start processing the CSV
processCSV(filePath);