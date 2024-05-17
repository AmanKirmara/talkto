/** @type {import('next').NextConfig} */
const nextConfig = {
    env : {
        API_KEY: process.env.API_KEY,
        MONGO_URI: process.env.MONGO_URI,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY
    }
};

export default nextConfig;
