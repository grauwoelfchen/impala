# Impala

![logo](img/logo.jpg?raw=true "Impala")

A Slack bot interacts with GitHub Issues.

## Overview

TODO

* A slack command shows a modal to GitHub Issues
* An endpoint for incoming webhook from GitHub


## Setup

```zsh
% make setup
```


## Build

```zsh
% make build
```


## Test

TODO


## Deploy

### Cloud Run

```zsh
: build using cloud build
% PROJECT_ID="..." make build:cloud

% cp .env.sample .env
% PROJECT_ID="..." make deploy:run
```

### Glitch

TODO


## Note

In order to create/configure the app, visit:
https://api.slack.com/apps
