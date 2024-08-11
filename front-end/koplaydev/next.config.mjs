/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  extendDefaultRuntimeCaching: true,
});

const nextConfig = {
  reactStrictMode: false,
  env: {
    customKey: 'https://i11b302.p.ssafy.io/api',
    // customKey: "http://localhost:8080",
    OPEN_AI_KEY: "sk-proj-1aXEx816H7ZmZbZQv6PpT3BlbkFJDvOpDCe9zriyPOeTkkn6",
    GOOGLE_TEXT_TO_SPEECH_KEY: "AIzaSyD1B-sZqzSBPxN33TPmv2XkKUuL08_ejkI",
  },
};

export default withPWA(nextConfig);