const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const app = express();


app.use(express.static(path.join(__dirname, 'public')));

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath:'/',
      },
    module:{
        rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
              },
            },
            {
              test: /\.css$/,
              use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'images', // Specify the output directory for images
                    },
                  },
                ],
              },
              {
                test: /\.(png|jpg|gif)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 10000000, // or use file-loader for larger files
                      name: 'images/[hash].[ext]',
                    },
                  },
                ],
              },
          ],
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './public/index.html',
        }),
        new MiniCssExtractPlugin({
          filename: '[name].css', // Use [name] placeholder to handle multiple CSS files
        }),
      ],
    
    devServer: {
        historyApiFallback: true, // This enables the fallback to /index.html for single-page applications
        static: {
      directory: path.join(__dirname, 'public'),
         },
        port: 3000,
        open: true,
      },


};
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
