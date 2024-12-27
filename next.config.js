/** @type {import('next').NextConfig} */
const nextConfig = {
    // below headers() func is for getting avatar/img from google
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "referrer-policy",
            value: "no-referrer",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
