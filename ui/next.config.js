/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

const withTM = require('next-transpile-modules')(['@googlemaps/typescript-guards']);
module.exports = withTM