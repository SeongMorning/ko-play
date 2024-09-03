/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  extendDefaultRuntimeCaching: true,
});

const nextConfig = {
  reactStrictMode: false,
  env: {
    customKey: "",
    // customKey: "http://localhost:8080",
    OPEN_AI_KEY: "",
    GOOGLE_TEXT_TO_SPEECH_KEY: "",
  },
};

export default withPWA(nextConfig);
