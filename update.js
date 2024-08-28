const { virtual_env, project_dir } = require("./constants");
module.exports = {
  run: [{
    method: "shell.run",
    params: {
      message: "git pull"
    }
  }, {
    method: "shell.run",
    params: {
      path: project_dir,
      message: "git pull"
    }
  }]
}
