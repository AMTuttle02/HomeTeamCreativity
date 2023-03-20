default:
    @just --list

build:
    @docker compose build

up: build
    @docker compose up -d

stop:
    @docker compose stop

down:
    @docker compose down