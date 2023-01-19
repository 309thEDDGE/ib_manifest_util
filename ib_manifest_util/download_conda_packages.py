import logging
import sys
import requests

from pathlib import Path

from ib_manifest_util import DEFAULT_MANIFEST_FILENAME, PACKAGE_DIR
from ib_manifest_util.util import load_yaml

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

def download_packages(
    manifest_path: str | Path = None,
    urls: list = None,
    download_path: str | Path = Path.cwd(),
):
    """
    Download conda packages from a manifest file or a list of urls.
    Choose either a manifest file or a list of urls, not both.

    Args:
        manifest_path: str | Path
            Optional path to manifest file.  Superseded by urls.
        urls: list
            Optional list of package urls to download.  Supersedes manifest_path.
        download_path: str | Path
            Optional path to download package. Default: current working directory
    """

    if isinstance(manifest_path, str):
        manifest_path = Path(manifest_path)

    if isinstance(download_path, str):
        download_path = Path(download_path)

    if not download_path.exists():
        print(f"{download_path} does not exist!")
        sys.exit(1)
    if not download_path.is_dir():
        print(f"{download_path} is not a directory!")
        sys.exit(1)

    manifest = None
    manifest_source = None
    if urls:
        manifest = {"resources": []}
        manifest_source = "command line"
        for url in urls:
            manifest["resources"].append(
                {
                    "url": url,
                    "filename": url.split("/")[-1].lstrip("_"),
                    "validation": {"type": None},
                }
            )

    if not manifest:
        if not manifest_path:
            manifest_path = Path.cwd() / DEFAULT_MANIFEST_FILENAME

        manifest_source = str(manifest_path)
        try:
            manifest = load_yaml(manifest_path)
        except Exception as e:
            print(f"error loading manifest: {manifest_path.name}")
            print(str(e))
            sys.exit(1)

    if not manifest:
        print(f"no manifest or urls provided")
        sys.exit(1)


    logger.info(f"Downloading from manifest:[{manifest_source}]")
    logger.info(f"Downloading to {download_path.resolve()}")
    tot = len(manifest["resources"])
    error_count = 0
    for i, entry in enumerate(manifest["resources"]):
        fname = entry["filename"]
        url = entry["url"]
        print(f"Downloading {i+1:3d} of {tot}: {fname}")
        try:
            with requests.get(url, allow_redirects=True) as r:
                if r.status_code > 400:
                    logger.error(f"ERROR! occurred downloading '{url}'")
                    logger.error(f"server returned status: {r.status_code}")
                    error_count += 1
                else:
                    with open(download_path / fname, "wb") as f:
                        f.write(r.content)
        except Exception as e:
            logger.error(f"ERROR! {str(e)}")
            error_count += 1

    if error_count:
        sys.exit(1)

if __name__ == "__main__":
    download_packages()
