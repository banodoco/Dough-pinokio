const path = require('path');

module.exports = () => {
  const config = {
    run: [
      {
        method: "script.stop",
        params: {
          uri: path.resolve(__dirname, "start.js"),
        },
      },
    ],
  };

  return config;
};
