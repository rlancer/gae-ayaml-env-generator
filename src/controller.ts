import YAML from 'yaml'

type TParams = {
  input: string
  envPrefix: string
}

export function generate({input, envPrefix}: TParams): string {
  const parsed = YAML.parse(input) || {}
  const newEnv: Record<string, string> = {}
  Object
    .keys(process.env)
    .filter(key => key.startsWith(envPrefix))
    .map(key => newEnv[key.replace(envPrefix, '')] = process.env[key] as string)

  if (!parsed['env_variables']) {
    parsed['env_variables'] = {}
  }
  Object.assign(parsed['env_variables'], newEnv)

  return YAML.stringify(parsed)
}
