import json
import os


def check_file(filename):
    return os.path.exists(filename)


def default_settings():
    data = {"exit message": False, "background color": "#A5A296", "button color": "#68FE5C",
            "button hover color": "#55ffff"}
    return data


def open_settings():
    filename = r"..\appData\settings.json"
    if not check_file(filename):
        settings = default_settings()
        write_settings(settings, filename)
        return settings
    with open(filename) as settings_file:
        data = json.load(settings_file)
    return data


def write_settings(data: dict, filename):
    with open(filename, 'w') as settings_file:
        json.dump(data, settings_file)