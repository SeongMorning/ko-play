import API from "../utils/API";

export default async function newAvatarAxios(countryName) {
  console.log(countryName);
  try {

    const { data } = await API.post(`/students/avatar?countryName=${countryName}`);
    console.log(data);
    return data.data;
  } catch (error) {
    console.log(error);
    console.log("Error Handling");
    return null;
  }
}

// import API from "../utils/API";

// export default async function newAvatarAxios(countryName) {
//   console.log(countryName);
//   try {
//     const { data } = await API.post(`/students/avatar?countryName=${countryName}`, null, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     console.log(data);
//     return data.data;
//   } catch (error) {
//     console.log(error);
//     console.log("Error Handling");
//     return null;
//   }
// }
