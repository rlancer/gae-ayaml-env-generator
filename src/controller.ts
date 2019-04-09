import YAML from 'yaml'
import fs from 'fs'
import path from 'path'

type TParams = {
  appYamlTemplatePath: string
  envPrefix: string
}

export function generate({appYamlTemplatePath, envPrefix}: TParams): string {
  const KEY_PREFIX = 'APP_'

  const parsed = YAML.parse(fs.readFileSync(path.resolve(appYamlTemplatePath), 'utf8')) || {}

  const newEnv: Record<string, string> = {}

  Object.keys(process.env).filter(key => key.startsWith(KEY_PREFIX)).map(key => newEnv[key.replace(KEY_PREFIX, '')] = process.env[key] as string)

  if (!parsed['env_variables']) {
    parsed['env_variables'] = {}
  }

  Object.assign(parsed['env_variables'], newEnv)

  const file = YAML.stringify(parsed)

  fs.writeFileSync('app.yaml', file)

  return file
}
