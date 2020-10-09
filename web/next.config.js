module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.md$/i,
      use: 'raw-loader'
    })

    return config
  }
}
