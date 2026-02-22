import { getProjects } from '~~/server/models/Project.model';

export default defineEventHandler(async (event) => {
  try {
    return (await getProjects()) || [];
  } catch (error) {
    console.error('❌ Error on getting some projects: ', error);
    return [];
  }
});
