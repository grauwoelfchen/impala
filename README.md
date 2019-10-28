# Rooibok

_Aepyceros melampus_

![Logo](img/logo.jpg?raw=true "Rooibok")

A Slack bot interacts with GitHub Issues.

## Overview

TODO

* A slack command shows a modal to submit an issue to GitHub
* An endpoint for incoming webhook from GitHub

##### Screenshots

![A modal view](img/modal-view-20191029.png?raw=true "A modal view")


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

In order to create/configure your app, visit:  
https://api.slack.com/apps


## Links

* https://api.slack.com/
* https://cloud.google.com/run/

* https://github.com/slackapi/bolt
* https://github.com/slackapi/node-slack-sdk
