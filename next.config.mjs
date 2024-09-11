/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        LUMX_URL_BASE:  process.env.LUMX_URL_BASE,
        LUMX_API_KEY: process.env.LUMX_API_KEY,
        LUMX_WALLET_ID: process.env.LUMX_WALLET_ID,
        LUMX_CONTRACT_ID: process.env.LUMX_CONTRACT_ID,
        LUMX_CONTRACT_ADDRESS: process.env.LUMX_CONTRACT_ADDRESS,
        CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
      },

      async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://protocol-sandbox.lumx.io/:path*' // Proxy to Backend
          }
        ]
      },
};

export default nextConfig;
