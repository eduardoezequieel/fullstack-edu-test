/**
 * Server-side student utilities
 * Use these in server components for data fetching
 */

interface StudentStats {
  total: number;
  active: number;
  graduated: number;
}

/**
 * Get student statistics from backend
 */
export async function getStudentStats(): Promise<StudentStats | null> {
  try {
    const response = await fetch(
      `${process.env.API_URL || 'http://localhost:4000'}/students/stats`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch student stats:', response.status);
      return null;
    }

    return (await response.json()) as StudentStats;
  } catch (error) {
    console.error('Error fetching student stats:', error);
    return null;
  }
}
