FROM ubuntu:latest

ARG MANIFEST_UTIL_REPO=https://github.com/metrostar/ib_manifest_util.git
ARG CONDA_VENDOR_REPO=https://github.com/metrostar/conda-vendor.git

# install micromamba
RUN apt-get update \
	&& apt-get install curl bzip2 git vim -y \
	&& curl -Ls https://micro.mamba.pm/api/micromamba/linux-64/latest | tar -xvj bin/micromamba

WORKDIR /repos/

# Clone relevant git repos
RUN git clone $MANIFEST_UTIL_REPO \
	&& git clone $CONDA_VENDOR_REPO

# Install micromamba, create env, install correct conda-vendor
RUN eval "$(micromamba shell hook --shell=dash)" \
	&& micromamba create -f /repos/ib_manifest_util/environment.yml -y\
	&& micromamba activate ib_manifest_env \
	&& micromamba install mamba -c conda-forge\
	&& python3 -m pip install -e /repos/ib_manifest_util \
	&& python3 -m pip install -e /repos/conda-vendor \
	&& micromamba shell init --shell=bash --prefix=~/micromamba \
	&& echo "micromamba activate ib_manifest_env" >> ~/.bashrc

ENTRYPOINT ["/bin/bash"]
