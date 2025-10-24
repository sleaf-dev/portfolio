import { getAllProjects } from '../interfaces/projects/Project';
import { connectDB } from '../database/MongoDB';

export default defineEventHandler(async (event) => {
  try {
    await connectDB();
    const projects = await getAllProjects();
    return projects || [];
  } catch (error) {
    console.error('Error on getting projects: ', error);
    return [];
  }
});
