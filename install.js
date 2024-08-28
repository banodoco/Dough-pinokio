const { virtual_env, project_dir } = require("./constants");
const path = require('path');

function getInstallCommand(kernel) {
  const { platform, gpu } = kernel;

  function combineLists(list1, list2) {
    return [...list1, ...list2];
  }

  project_requirements = [
    `pip install -r ${path.resolve(__dirname, project_dir, 'requirements.txt')}`,
    `pip install -r ${path.resolve(__dirname, project_dir, 'comfy_runner', 'requirements.txt')}`,
    `pip install -r ${path.resolve(__dirname, project_dir, 'ComfyUI', 'requirements.txt')}`,
  ];

  // only handling linux and win32 for now
  if (platform == "linux") {
    cmd_list = []; // pinokio by default uses py3.10
    return combineLists(cmd_list, project_requirements);
  }

  if (platform == "win32") {
    cmd_list = [
      "python.exe -m pip install --upgrade pip",
      "pip install websocket",
      "pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118",
    ];

    return combineLists(cmd_list, project_requirements);
  }

  // only installing the base app for the mac
  return [
    `pip install -r ${path.resolve(__dirname, project_dir, 'requirements.txt')}`,
  ];
}

module.exports = async (kernel) => {
  const config = {
    run: [
      {
        method: "shell.run",
        params: {
          message: [
            `git clone --depth 1 -b main https://github.com/banodoco/Dough.git ${project_dir}`,
          ],
        },
      },
      {
        method: "shell.run",
        params: {
          path: project_dir,
          message: [
            "git clone --depth 1 -b main https://github.com/piyushK52/comfy_runner",
            "git clone https://github.com/comfyanonymous/ComfyUI.git",
          ],
        },
      },
      {
        method: "shell.run",
        params: {
          path: project_dir,
          venv: virtual_env,
          message: getInstallCommand(kernel)
        },
      },
      {
        method: "fs.copy",
        params: {
          src: `${project_dir}/.env.sample`,
          dest: `${project_dir}/.env`,
        },
      },
      {
        method: "fs.link",
        params: {
          drive: {
            "checkpoints": `${project_dir}/ComfyUI/models/checkpoints`,
            "clip": `${project_dir}/ComfyUI/models/clip`,
            "clip_vision": `${project_dir}/ComfyUI/models/clip_vision`,
            "configs": `${project_dir}/ComfyUI/models/configs`,
            "controlnet": `${project_dir}/ComfyUI/models/controlnet`,
            "embeddings": `${project_dir}/ComfyUI/models/embeddings`,
            "loras": `${project_dir}/ComfyUI/models/loras`,
            "upscale_models": `${project_dir}/ComfyUI/models/upscale_models`,
            "vae": `${project_dir}/ComfyUI/models/vae`
          },
          peers: [
            "https://github.com/cocktailpeanutlabs/automatic1111.git",
            "https://github.com/cocktailpeanutlabs/fooocus.git",
            "https://github.com/cocktailpeanutlabs/forge.git"
          ]
        }
      },
    ],
  };
  return config;
};
