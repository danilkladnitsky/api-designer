NODE_VERSION ?= $(shell cat common/.nvmrc)

setup-node:
	source ~/.nvm/nvm.sh && nvm use $(NODE_VERSION)

run-backend:
	cd llm-service/app && uvicorn main:app --reload