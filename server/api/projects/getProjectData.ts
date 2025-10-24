import { getProjectByName } from '../interfaces/projects/Project';
import { connectDB } from '../database/MongoDB';

export default defineEventHandler(async (event) => {
  const id = getQuery(event).id || 'null';
  try {
    await connectDB();
    const project = await getProjectByName(id.toString().trim());
    return project || {};
  } catch (error) {
    console.error('Error on getting project data: ', error);
    return {};
  }
});
