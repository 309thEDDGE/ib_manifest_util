import logging
import subprocess
import sys
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import urlretrieve

from jinja2 import Environment, FileSystemLoader
from ruamel.yaml import YAML

from ib_manifest_util import TEMPLATE_DIR

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)


def write_templatized_file(
    template_filename: str | Path,
    output_path: str | Path,
    content: dict,
    template_dir: str | Path = TEMPLATE_DIR,
):
    """Generic file writer for Jinja2 templates

    Args:
        template_filename: Filename of Jinja template (not including directory)
        output_path: Full path for the output file to be written
        content: Dictionary with keys matching expected Jinja variables
        template_dir: Path to the Jinja template directory
    """
    environment = Environment(loader=FileSystemLoader(template_dir))
    template = environment.get_template(str(template_filename))

    template_content = template.render(**content)

    if isinstance(output_path, str):
        output_path = Path(output_path)

    # make the output directory if it doesn't exist
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with open(output_path, mode="w", encoding="utf-8") as message:
        message.write(template_content)


def load_yaml(file_path: str | Path, loader_type: str = "safe") -> dict:
    """Load a yaml file after checking that it exists.

    Args:
        file_path: str | Path
            Full path to yaml file.
        loader_type: str
            Options from yaml docstring:
                'rt'/None -> RoundTripLoader/RoundTripDumper,  (default)
                'safe'    -> SafeLoader/SafeDumper,
                'unsafe'  -> normal/unsafe Loader/Dumper
                'base'    -> baseloader

    Returns: dict

    """
    yaml_loader = YAML(typ=loader_type)

    file_path = Path(file_path).resolve()
    if file_path.exists():
        with open(file_path, "r") as f:
            return yaml_loader.load(f)
    else:
        raise FileNotFoundError(f"File not found: {file_path}")


def dump_yaml(
    source_dict: dict,
    target_path: str | Path,
    dumper_type: str = "safe",
    flow_style: bool = False,
):
    """Write dict as yaml format into a target file.
    Args:
        source_dict: Dictionary to dump into the target file.
        target_path: Full path to target yaml file.
        dumper_type:
            Options from yaml docstring:
                'rt'/None -> RoundTripLoader/RoundTripDumper,  (default)
                'safe'    -> SafeLoader/SafeDumper,
                'unsafe'  -> normal/unsafe Loader/Dumper
                'base'    -> baseloader
        flow_style:
            Options from yaml docstring:
                'True'    -> output dictionary in block style
                'False'   -> output dictionary in flow style
    """
    yaml_dumper = YAML(typ=dumper_type)
    yaml_dumper.default_flow_style = flow_style

    with open(target_path, "w") as target:
        yaml_dumper.dump(source_dict, target)


def run_subprocess(command: str, return_as_str=False):
    """Run generic subprocess command.

    Args:
        command: Command to be run as a subprocess
        return_as_str: Return the subprocess stdout as a string instead of streaming to stdout
    """
    encoding = "utf-8"
    process = subprocess.Popen(command.split(" "), stdout=subprocess.PIPE)

    if return_as_str:
        return process.stdout.read().decode(encoding)

    for line in iter(lambda: process.stdout.read(1), b""):
        sys.stdout.write(line.decode(encoding))

