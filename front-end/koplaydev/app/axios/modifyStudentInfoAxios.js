import API from '../utils/API';

export default async function modifyStudentInfoAxios(form) {
    try {
        const { data } = await API.put('/students/info',
            form,{
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        return data;
    } catch (error){
        // Error Handling
        console.log(error)
        console.log("error Handling")
        return null;
    }

}