NODE_VERSION ?= $(shell cat common/.nvmrc)

setup-node:
	source ~/.nvm/nvm.sh && nvm use $(NODE_VERSION)