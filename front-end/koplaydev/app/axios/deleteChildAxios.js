import API from '../utils/API';

export default async function deleteChildAxios(studentId) {
    try {
        const { data } = await API.delete('parent/child/'+studentId);
        return data.data;
       
    } catch (error) {
        console.log(error);
        console.log("Error Handling");
        return null;
    }
}