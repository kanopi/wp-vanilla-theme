const PostCSSPresetEnv = require('postcss-preset-env');
const Sass = require('sass');

const { node } = require('../package');

module.exports = (prepended_paths, prepend_variable_data, use_source_maps, resolve_import_urls) => {
    let isSourceMapsEnabled = use_source_maps ?? true;
    let isResolveUrlsEnabled = resolve_import_urls ?? false;
    let prependVariableData = prepend_variable_data ?? '';

    let baseRules = [
        {
            loader: 'css-loader',
            options: {
                sourceMap: isSourceMapsEnabled,
                url: isResolveUrlsEnabled
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        PostCSSPresetEnv,
                        {
                            autoprefixer: { 'grid': 'autoplace' }
                        }
                    ]
                },
                sourceMap: isSourceMapsEnabled
            }
        },
        {
            loader: 'sass-loader',
            options: {
                additionalData: prependVariableData,
                implementation: Sass,
                sassOptions: {
                    includePaths: [
                        node
                    ],
                    linefeed: 'lf',
                    outputStyle: 'expanded',
                },
                sourceMap: isSourceMapsEnabled,
            }
        }
    ];

    if (Array.isArray(prepended_paths) && 0 < prepended_paths.length) {
        baseRules.push({
            loader: 'style-resources-loader',
            options: {
                patterns: prepended_paths
            }
        });
    }

    return baseRules;
}