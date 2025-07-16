FROM --platform=linux/amd64 node:20-bookworm-slim

# Install a basic environment needed for our build tools
RUN apt-get -yq update && \
    apt-get -yqq install --no-install-recommends \
    curl \
    ca-certificates \
    build-essential \
    pkg-config \
    libssl-dev \
    llvm-dev \
    liblmdb-dev \
    clang \
    cmake \
    rsync \
    git \
    libunwind-dev && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
# Install dfx
RUN DFX_VERSION=0.24.1 DFXVM_INIT_YES=true sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
ENV PATH="/root/.local/share/dfx/bin:$PATH"

# Verify installation
RUN dfx --version