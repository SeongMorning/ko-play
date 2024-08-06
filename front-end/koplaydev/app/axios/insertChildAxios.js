import API from '../utils/API';

export default async function insertChildAxios(student) {
    console.log(student)
    try {
        const { data } = await API.post('parent/child', student,{
            headers: {
                'Content-Type': 'application/json'
            }
        }
        );
        return data.data;
    } catch (error) {
        console.log(error);
        console.log("Error Handling");
        return null;
    } 
}