const { virtual_env, project_dir } = require("./constants");
module.exports = {
  run: [{
    method: "fs.rm",
    params: {
      path: project_dir
    }
  }]
}
