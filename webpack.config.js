const path = require("path");
const fs = require("fs");
const CopywebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const __app_dirname = (subdir) => __dirname + "/app/" + subdir;

module.exports = {
    entry: {
        background: path.resolve(__app_dirname("src/js"), "background.js"),
    },

    output: {
        filename: "js/[name].js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
    plugins: [
        new CopywebpackPlugin({
            patterns: [
                { from: __app_dirname("assets"), to: "assets" },
                { from: __app_dirname("manifest.json"), to: "manifest.json" },
            ],
        }),
        new MiniCssExtractPlugin({ filename: "css/[name].css" }),

        // Since browsers don't allow usage of eval by default
        // inject a prop into the manifest.json when in dev mode
        // allowing us to explicitly enable the usage of eval
        // We could change the devtool but eval has faster build times
        function () {
            this.plugin("done", (stats) => {
                // Inject only in dev mode
                if (stats.compilation.options.mode === "development") {
                    fs.readFile("./app/manifest.json", (err, data) => {
                        fs.writeFile(
                            "./dist/manifest.json",
                            JSON.stringify({
                                ...JSON.parse(data),
                                content_security_policy:
                                    "script-src 'self' 'unsafe-eval'; object-src 'self'",
                            }),
                            () => {}
                        );
                    });
                }
            });
        },
    ],
};
