import { neon } from '@neondatabase/serverless';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);

    // Fetch all records from the database
    const dbRecords = await sql`SELECT * FROM mix_records ORDER BY created_at DESC`;

    // Transform database records to frontend format
    const records = dbRecords.map(record => ({
      id: uuidv4(), // Generate new UUIDs for frontend records
      colorA: record.color_a,
      colorB: record.color_b,
      resultColor: record.result_color,
      algorithm: record.algorithm,
      timestamp: new Date(record.created_at).toISOString()
    }));

    return res.status(200).json({
      success: true,
      message: `Successfully retrieved ${records.length} records`,
      records
    });
  } catch (error) {
    console.error('Error fetching records:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch records',
      error: error.message
    });
  }
}