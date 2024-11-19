module.exports = {
    webpack: (config) => {
        // Enable polling for file changes, useful in Docker or VM environments
        config.watchOptions.poll = 300;

        // Disable Webpack's internal caching (for debugging purposes)
        config.cache = false;

        // Alternatively, you can set a more aggressive caching strategy if you're not debugging
        // config.cache = {
        //   type: 'filesystem',
        // };

        return config;
    },
};
