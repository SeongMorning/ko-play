import API from '../utils/API';

export default async function translations(language) {
    console.log("check"+language)
    try {
        const { data } = await API.get('/translations',
            {
                headers: {
                    'Accept-Language': language // 원하는 언어로 헤더 설정
                }
            }
        )
        // const translations = data;
        console.log(data)
        return data;
    } catch (error){
        // Error Handling
        console.log(error)
        console.log("error Handling")
        return null;
    }
}