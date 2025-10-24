import axios from 'axios';
const config = useAppConfig();

export default defineEventHandler(async (event) => {
  try {
    const response = await axios
      .get(config.gitlab.calendarUrl)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    return { status: 'OK', calendar: response.data || {} };
  } catch (error) {
    return { status: 'ERR', calendar: {} };
  }
});
