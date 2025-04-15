import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    const records = req.body;

    if (!Array.isArray(records)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid data format. Expected an array of records.'
      });
    }

    // Step 1: Clear existing records from the database
    await sql`TRUNCATE TABLE mix_records`;

    // Step 2: Insert the new records
    if (records.length > 0) {
      for (const record of records) {
        await sql`
          INSERT INTO mix_records
          (color_a, color_b, result_color, algorithm)
          VALUES (
            ${record.colorA},
            ${record.colorB},
            ${record.resultColor},
            ${record.algorithm}
          )
        `;
      }
    }

    return res.status(200).json({
      success: true,
      message: `Successfully uploaded ${records.length} records`,
      count: records.length
    });
  } catch (error) {
    console.error('Error uploading records:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to upload records',
      error: error.message
    });
  }
}