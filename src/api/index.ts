const BASE_URL: string = "https://xxxxxxxxxx.xxx";

const dummyPost = (payload: { name: string; file: string }) => {
  console.log(`POST request to ${BASE_URL}/upload`, { payload });
};

// Ta fonction d'upload va commencer avec ce genre de chose
/*const post = async (payload) => {
    const { data } = await axios.post(`${BASE_URL}/upload`, payload)
}*/

const dummyGet = (payload: string) => {
  console.log(`GET request to ${BASE_URL}/${payload}`);
};

// Ta fonction de recup va commencer avec ce genre de chose
// const get = async (payload) => {
//   const { data } = await axios.get(`${BASE_URL}/${payload}`);
// };

export { dummyPost, dummyGet };
