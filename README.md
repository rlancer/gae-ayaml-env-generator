# Google App Engine - app.yaml environment variable generator for CI / CD systems

Generates an app.yaml file from a template and environment variables, designed for use with GitLab's CI / CD system.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/gae-ayaml-env.svg)](https://npmjs.org/package/gae-ayaml-env)
[![Downloads/week](https://img.shields.io/npm/dw/gae-ayaml-env.svg)](https://npmjs.org/package/gae-ayaml-env)
[![License](https://img.shields.io/npm/l/gae-ayaml-env.svg)](https://github.com/code/gae-ayaml-env/blob/master/package.json)


# Usage

Set your environment variables in GitLab (or other system), prefix variables you'd like to persist in app.yaml with "APP\_", for example:

![Environment variables in GitLab](https://gitlab.com/collaborizm-community/gae-appyaml-env-generate/uploads/a490e948a1f26f08d6cf77e180b826c6/image.png)

Create an app.template.yaml file include everything sans environment variables

```yaml
runtime: nodejs10
env: standard

automatic_scaling:
  min_instances: 0
  max_instances: 2

service: default

env_variables:
  NODE_ENV: 'production'
```

In your CI / CD process run `gae-ayaml-env` to emit a populated app.yaml file, make sure you do not commit an actual app.yaml file as it will be overwritten.

Example for GitLab

```yaml
deploy:
  image: 'rlancer/gcloud-node:LTS-229'
  script:
    - npm i
    - npm run build
    - npx gae-ayaml-env
    - echo $GCLOUD_SERVICE > /tmp/$CI_PIPELINE_ID.json
    - gcloud auth activate-service-account --key-file /tmp/$CI_PIPELINE_ID.json
    - gcloud --quiet --project $GCLOUD_PROJECT_ID app deploy app.yaml
  only:
    - prod
```

The system will write an app.yaml file fully populated with all the variables prefixed with "APP\_".

```yaml
runtime: nodejs10
env: standard

env_variables:
  APIMARKET_FROM: '******************'
  DB_DATABASE: '******************'
  DB_HOST: '******************'
  DB_PASSWORD: '******************'
  DB_USER: '******************'
  NODE_ENV: production
  SLACK_APP_ID: '******************'
  SLACK_BOT_TOKEN: '******************'
  SLACK_CLIENT_ID: '******************'
  SLACK_CLIENT_SECRET: '******************'
  SLACK_OAUTH_REDIR: '******************'
  SLACK_SIGNING_SECRET: '******************'
  SLACK_TOKEN: '******************'
  SLACK_VERIFICATION_TOKEN: '******************'
automatic_scaling:
  max_instances: 2
```

### Hide Output in Console
to hide the output of the generated file in the console you can use the flag: *no-output*

Example using npx:
```
npx gae-ayaml-env --no-output
```

### Special thanks

> to [@dannyzen](https://github.com/dannyzen) from Google for helping Collaborizm move to GCP.
