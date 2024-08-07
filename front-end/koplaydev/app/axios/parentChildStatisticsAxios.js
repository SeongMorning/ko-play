// import API from "../utils/API";

// export default async function parentChildStatisticsAxios(childId) {
//   try {
//     const { data } = await API.get("/parent/child/" + childId + "/statistics");
//     return data.data;

//   } catch (error) {
//     // Error Handling
//     console.log(error);
//     console.log("error Handling");
//     return null;
//   }
// }

import API from "../utils/API";

export default async function parentChildStatisticsAxios(childId) {
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

// const parentChildStatisticsAxios = async (childId) => {
//   try {
//     const response = await axios.get(`/api/statistics/${childId}/statistic`);
//     // 응답 구조 예시: [personalData, _, overallData]
//     return response.data;
//   } catch (error) {
//     console.error("Axios request failed:", error);
//     throw error; // 오류를 호출자에게 전달
//   }
// };

// export default parentChildStatisticsAxios;

