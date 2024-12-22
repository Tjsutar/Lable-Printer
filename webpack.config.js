const path = require('path');

module.exports = {
  entry: './src/index.tsx', // Entry point for the app
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'], // Resolve .ts, .tsx, and .js files
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Apply this rule to .ts and .tsx files
        use: 'ts-loader', // Use ts-loader to handle TypeScript files
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // Serve files from the dist folder
    compress: true,
    port: 3000, // Port for dev server
  },
  mode: 'development', // Set mode to development
};
