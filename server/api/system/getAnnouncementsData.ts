import { getAllAnnouncements } from '../interfaces/announcements/Announcement';
import { connectDB } from '../database/MongoDB';

export default defineEventHandler(async (event) => {
  try {
    await connectDB();
    const announcements = await getAllAnnouncements();
    return announcements || [];
  } catch (error) {
    console.error('Error on getting announcements: ', error);
    return [];
  }
});
