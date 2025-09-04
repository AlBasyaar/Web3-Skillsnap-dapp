FROM --platform=linux/amd64 node:20-bookworm-slim

# Install dependencies
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

# Install dfx manually (tanpa install.sh)
ENV DFX_VERSION=0.24.1
RUN curl -fsSL -o /tmp/dfx.tar.gz https://github.com/dfinity/sdk/releases/download/${DFX_VERSION}/dfx-x86_64-unknown-linux-gnu.tar.gz && \
    mkdir -p /root/.local/share/dfx && \
    tar -xvzf /tmp/dfx.tar.gz -C /root/.local/share/dfx --strip-components=1 && \
    rm /tmp/dfx.tar.gz
ENV PATH="/root/.local/share/dfx:$PATH"

# Verify installation
RUN dfx --version
