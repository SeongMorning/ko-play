import API from '../utils/API';

export default async function logoutAxios() {
    try {
        const { data } = await API.get('/logout');
        return 'success';
       
    } catch (error) {
        console.log(error);
        console.log("Error Handling");
        return null;
    }
}