import API from "../utils/API";

export default async function parentChildStatisticsAxios(childId) {
  try {
    const { data } = await API.get("/parent/child/" + childId + "/statistics");
    return data.data;

  } catch (error) {
    // Error Handling
    console.log(error);
    console.log("error Handling");
    return null;
  }
}
