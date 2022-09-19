include .env

.PHONY: up

up: 
	docker-compose up

.PHONY: down


.PHONY: up

down: 
	docker-compose down

.PHONY: down

.PHONY: up

silent: 
	docker-compose up -d

.PHONY: down

