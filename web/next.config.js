module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.md$/i,
      use: 'raw-loader'
    })

    config.module.rules.push({
      test: /\.(gql|graphql)$/,
      loader: 'graphql-tag/loader',
      exclude: ['/node_modules/', '/.next/'],
      enforce: 'pre'
    })

    return config
  }
}
