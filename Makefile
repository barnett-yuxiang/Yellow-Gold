# Yellow-Gold Makefile
# This file provides shortcuts for common development tasks

# Use bash as the shell
SHELL := /bin/bash

# Default target when just running 'make'
.PHONY: default
default: build

# Show help message with available commands
.PHONY: help
help:
	@echo "Yellow-Gold Development Commands:"
	@echo "--------------------------------"
	@echo "make build      - Compile the project for production"
	@echo "make check      - Run TypeScript type checking only"
	@echo "make dev        - Start the development server"
	@echo "make lint       - Run ESLint to check code quality"
	@echo "make lint-fix   - Run ESLint and automatically fix issues where possible"
	@echo "make clean      - Remove build artifacts"
	@echo "make help       - Show this help message"

# Build the project for production
.PHONY: build
build:
	@echo "Building project..."
	npm run build

# Run TypeScript type checking without emitting files
.PHONY: check
check:
	@echo "Running TypeScript type checking..."
	npx tsc --noEmit

# Start the development server
.PHONY: dev
dev:
	@echo "Starting development server..."
	npm run dev

# Run ESLint
.PHONY: lint
lint:
	@echo "Running ESLint..."
	npm run lint

# Run ESLint with auto-fix
.PHONY: lint-fix
lint-fix:
	@echo "Running ESLint with auto-fix..."
	npx eslint --fix .

# Clean build artifacts
.PHONY: clean
clean:
	@echo "Cleaning build artifacts..."
	rm -rf dist
	rm -rf node_modules/.vite
	@echo "Clean complete"

# Install dependencies
.PHONY: install
install:
	@echo "Installing dependencies..."
	npm install