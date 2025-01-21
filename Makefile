run-backend:
	cd llm-service/app && uvicorn main:app --reload

dev:
	docker compose -f docker-compose.base.yml -f docker-compose.dev.yml --env-file .env up

prod:
	docker compose -f docker-compose.base.yml -f docker-compose.prod.yml --env-file .env up

dev-build:
	docker compose -f docker-compose.base.yml -f docker-compose.dev.yml --env-file .env up --build

redis:
	docker compose -f docker-compose.base.yml -f docker-compose.dev.yml --env-file .env up redis