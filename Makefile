NODE_VERSION ?= $(shell cat common/.nvmrc)

setup-node:
	source ~/.nvm/nvm.sh && nvm use $(NODE_VERSION)

run-backend:
	cd llm-service/app && uvicorn main:app --reload

dev:
	docker compose -f docker-compose.base.yml -f docker-compose.dev.yml --env-file .env up

dev-build:
	docker compose -f docker-compose.base.yml -f docker-compose.dev.yml --env-file .env up --build

redis:
	docker compose -f docker-compose.base.yml -f docker-compose.dev.yml --env-file .env up redis