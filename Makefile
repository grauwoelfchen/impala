NAME ?= impala
IMAGE ?= gcr.io/$(PROJECT_ID)/$(NAME):latest

# -- setup {{{
setup:  ## Install node dev modules
	@npm i
.PHONY: setup
#  }}}

# -- verify {{{
verify\:lint:  ## Verify coding style for TypScript [alias: verify:lint, lint]
	@npm run lint
.PHONY: verify\:lint

lint: verify\:lint
.PHONY: lint

verify\:all: | verify\:lint  ## Check code using all verify:xxx targets [alias: verify]
.PHONY: verify\:all

verify: | verify\:all
.PHONY: verify
# }}}

# -- build {{{
build\:development:  ## Build in development mode [alias: build]
	npm run build:development
.PHONY: build\:development

build\:production:  ## Build in production mode
	npm run build:production
.PHONY: build\:production

build\:cloud:  ## Build an image using Cloud Build
	gcloud builds submit --config build.yaml .
.PHONY: build\:cloud

build: build\:development
.PHONY: build
#  }}}

# -- deploy {{{
deploy\:run:
	@if [ -f "./.env" ]; then \
	  source ./.env; \
	  export $$(cut -d= -f1 ./.env | grep -v "^$$" | grep -v "^#"); \
	fi; \
	port="8080"; \
	secret="SLACK_SIGNING_SECRET=$$SLACK_SIGNING_SECRET"; \
	token="SLACK_BOT_TOKEN=$$SLACK_BOT_TOKEN"; \
	gcloud beta run deploy $(NAME) \
    --image $(IMAGE) \
    --set-env-vars="$$secret,$$token" \
    --platform managed
.PHONY: deploy\:run
#  }}}

# -- other utilities {{{
watch\:build:  ## Start a process for build [alias: watch]
	@npm run watch:build
.PHONY: watch\:build

watch\:lint:  ## Start a process for tslint
	@npm run watch:lint
.PHONY: watch\:lint

watch: | watch\:build
.PHONY: watch

serve: | build\:development  ## Serve a development server on local
	@node dst/server.js
.PHONY: serve

clean:  ## Tidy up
	@rm dst/server*.js*
.PHONY: clean

help:  ## Display this message
	@grep --extended-regexp '^[0-9a-z\:\\]+: ' $(MAKEFILE_LIST) | \
	  grep --extended-regexp '  ## ' | \
	  sed --expression='s/\(\s|\(\s[0-9a-z\:\\]*\)*\)  /  /' | \
	  tr --delete \\\\ | \
	  awk 'BEGIN {FS = ":  ## "}; \
	      {printf "\033[38;05;026m%-19s\033[0m %s\n", $$1, $$2}' | \
	  sort
.PHONY: help
# }}}
