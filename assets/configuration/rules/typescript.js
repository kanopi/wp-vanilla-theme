const BabelLoader = require('../loaders/babel');
const JavascriptRules = require('./javascript');

module.exports = (use_source_maps, auto_typescript_file_patterns) => {
    let has_source_maps = use_source_maps ?? false;
    let auto_typescript_patterns = Array.isArray(auto_typescript_file_patterns)
        ? auto_typescript_file_patterns : [];

    auto_typescript_patterns.concat([/\.vue$/]);

    return JavascriptRules(has_source_maps).concat([
        {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: BabelLoader(has_source_maps)
                .concat([
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: auto_typescript_patterns,
                            transpileOnly: true
                        }
                    }
                ])
        }
    ]);
}