FROM node:18-alpine

WORKDIR /app

# Install basic tools (Git, Python, etc.)
RUN apk add --no-cache python3 make g++ git curl bash

# Clone the repository (So we have the files ready)
RUN git clone https://github.com/LayerZero-Labs/LayerZero-v2.git .

# Install Node.js dependencies (Fast & Easy)
RUN yarn install

# EXPOSE the ports we might need later
EXPOSE 3000

# COMMAND: Just stay alive and wait.
# We skip 'yarn build' because we don't need to compile Sui/Aptos contracts yet.
CMD ["tail", "-f", "/dev/null"]
