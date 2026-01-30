.PHONY: all build clean install_dependencies help

all: build ## Main task for local dev
	python3 -m http.server

build: ## Bunbles and minifies the project
	bun script/bundle.ts

clean: ## Cleans all artifacts
	rm -rf build/

install_dependencies: ## Install dependencies
	bun install -d bun-types
	bun add @types/web -D

help: ## Show this help
	@grep -Eh '\s##\s' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
