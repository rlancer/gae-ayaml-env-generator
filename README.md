Google App Engine - app.yaml environment variable generator for CI / CD systems 
=================

Generates an app.yaml file from a template and environment variables, designed for use with GitLab CI / CD system

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/gae-ayaml-env.svg)](https://npmjs.org/package/gae-ayaml-env)
[![Downloads/week](https://img.shields.io/npm/dw/gae-ayaml-env.svg)](https://npmjs.org/package/gae-ayaml-env)
[![License](https://img.shields.io/npm/l/gae-ayaml-env.svg)](https://github.com/code/gae-ayaml-env/blob/master/package.json)


# Usage

Set your environment variables in GitLab, prefix an variable, you'd like to persist with "APP_"   

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

In your CI / CD process run `npx gae-ayaml-env` to emit a populated app.yaml file

Example for GitLab

```yaml
deploy:
  image: "rlancer/gcloud-node:LTS-229"
  script:
    - npm i
    - npm run build
    - npm run generate_app_yaml
    - echo $GCLOUD_SERVICE > /tmp/$CI_PIPELINE_ID.json
    - gcloud auth activate-service-account --key-file /tmp/$CI_PIPELINE_ID.json
    - gcloud --quiet --project $GCLOUD_PROJECT_ID app deploy app.yaml
  tags:
    - theonlyrunnerthatshouldeverbeusedbycollaborizm
  only:
    - prod
```
