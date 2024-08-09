
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
      // customKey: 'https://i11b302.p.ssafy.io/api',
      customKey: "http://192.168.31.189:8080",
      OPEN_AI_KEY: "sk-proj-1aXEx816H7ZmZbZQv6PpT3BlbkFJDvOpDCe9zriyPOeTkkn6",
      GOOGLE_TEXT_TO_SPEECH_KEY: "AIzaSyD1B-sZqzSBPxN33TPmv2XkKUuL08_ejkI",
    },
  };
  
  export default nextConfig;
