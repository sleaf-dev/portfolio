import { getProjects } from '../../database/interfaces/projects/Project';
import { connectDB } from '../../database/MongoDB';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { amount } = body;
  try {
    await connectDB();
    return { projects: (await getProjects(amount)) || [] };
  } catch (error) {
    console.error('❌ Error on getting some projects: ', error);
    return { projects: [] };
  }
});
