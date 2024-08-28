const path = require('path');

const { virtual_env, project_dir } = require("./constants");

module.exports = () => {
  const config = {
    daemon: true,
    run: [
    	{
        method: "shell.run",
        params: {
          venv: path.resolve(__dirname, project_dir, virtual_env),
          message: "python st_fix.py",
          on: [{ event: "/http:\/\/[0-9.:]+/", done: true }],
        },
      },
      {
        method: "shell.run",
        params: {
          path: project_dir,
          venv: path.resolve(__dirname, project_dir, virtual_env),
          message: "streamlit run app.py --runner.fastReruns false --server.port 5500",
          on: [{ event: "/http:\/\/[0-9.:]+/", done: true }],
        },
      },
      {
        method: "local.set",
        params: {
          url: "{{input.event[0]}}"
        }
      },
    ],
  };
  return config;
};
