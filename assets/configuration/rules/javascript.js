const BabelLoader = require('../loaders/babel');

module.exports = (use_source_maps) => {
    let has_source_maps = use_source_maps ?? false;

    return [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: BabelLoader(has_source_maps)
        }
    ]
}