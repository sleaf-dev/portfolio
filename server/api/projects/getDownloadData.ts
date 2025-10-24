import axios, {AxiosResponse} from "axios";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { link } = body;
    try {
        if (link.includes('github.com')) {
            const requestLink = link.replace('github.com', 'api.github.com/repos');
            const response = await postGet(`${requestLink}/releases/latest`);
            if (response.status === 200) {
                const body = response.data;
                return { success: true, data: { version: ` ${body.tag_name}`, downloadLink: body.assets[0].browser_download_url }};
            }
        } else if (link.includes('gitlab.com') || link.includes('git.sleaf.dev')) {
            const requestLink = link.replace('git.sleaf.dev/', 'git.sleaf.dev/api/v4/projects/').replace('.com/', '.com/api/v4/projects/');
            const response = await postGet(`${requestLink}/releases/latest`);
            if (response.status === 200) {
                const body = response.data[0];
                return { success: true,  data: { version: ` ${body.tag_name}`, downloadLink: body._links.self } };
            }
        }
        return { success: true,  data: { version: '', downloadLink: link }};
    } catch (error) {
        console.error('Error on getting download data: ', error);
        return { success: false, data: { version: '', downloadLink: '' }};
    }
})

async function postGet(link: string): Promise<AxiosResponse<any>> {
    return await axios.get(link)
               .then(response => {
                   return response;
               })
               .catch(error => {
                   return error.response;
               });
}
