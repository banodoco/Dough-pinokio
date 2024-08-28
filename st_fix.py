import os

CONFIG_FOLDER_NAME = ".streamlit"
CREDENTIAL_FILE_NAME = "credentials.toml"
CREDENTIAL_FILE_CONTENT = """[general]
email="xyz@gmail.com"
"""

def get_credential_file_path() -> str:
    home_dir = os.path.expanduser("~")
    if home_dir is None:
        raise RuntimeError("No home directory.")

    config_folder_path = os.path.join(home_dir, CONFIG_FOLDER_NAME)
    credential_file_path = os.path.join(config_folder_path, CREDENTIAL_FILE_NAME)
    return credential_file_path

def create_credential_file() -> None:
    credential_file_path = get_credential_file_path()

    config_folder_path = os.path.dirname(credential_file_path)
    if not os.path.exists(config_folder_path):
        os.makedirs(config_folder_path)

    try:
        with open(credential_file_path, "wb+") as file:
            file.write(CREDENTIAL_FILE_CONTENT.encode())
        print(f"Created {CREDENTIAL_FILE_NAME} at {credential_file_path}")
    except OSError as e:
        print(f"Error creating {CREDENTIAL_FILE_NAME}: {e}")

    print(f"Created {CREDENTIAL_FILE_NAME} at {credential_file_path}")

if __name__ == "__main__":
    create_credential_file()