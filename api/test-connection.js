import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  try {
    // Use the DATABASE_URL from environment variables
    const sql = neon(process.env.DATABASE_URL);

    // Simple query to test the connection
    const result = await sql`SELECT NOW()`;

    // If we get here, connection was successful
    return res.status(200).json({
      success: true,
      message: 'Database connection successful',
      serverTime: result[0].now
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to connect to database',
      error: error.message
    });
  }
}