import API from "../utils/API";

export default async function parentChildStatisticsAxios(childId) {
  // console.log(childId)
  try {
    const response = await API.get(`/parent/child/${childId}/statistics`);
    return response.data;
  } catch (error) {
    // Error Handling
    console.log(error);
    console.log("error Handling");
    return null;
  }
}
