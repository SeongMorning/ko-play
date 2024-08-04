import API from '../utils/API';

export default async function login(code) {
    try {
        const { data } = await API.post('/login',
            code
        )
        return data;
    } catch (error){
        // Error Handling
        console.log(error)
        console.log("error Handling")
        return null;
    }

}