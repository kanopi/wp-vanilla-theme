module.exports = (use_source_maps) => {
    let has_source_maps = use_source_maps ?? false;

    return [
        {
            loader: 'babel-loader',
            options: {
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            targets: {
                                esmodules: true
                            }
                        }
                    ]
                ],
                sourceMaps: has_source_maps
            }
        }
    ];
}