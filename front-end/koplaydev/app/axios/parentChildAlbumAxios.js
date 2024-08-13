import API from "../utils/API";

export default async function parentChaildAlbumAxios(studentId) {
  try {
    const { data } = await API.get(`parent/child/${studentId}/snapshots`);
    return data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}