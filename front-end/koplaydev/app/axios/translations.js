import API from '../utils/API';

export default async function translations(language) {
    try {
        const { data } = await API.get('/translations',
            {
                headers: {
                    'Accept-Language': language
                }
            }
        )
        return data;
    } catch (error){
        console.log(error)
        console.log("error Handling")
        return null;
    }
}