import YAML from 'yaml'

export default function generate (input, envPrefix, env) {
  const parsed = YAML.parse(input) || {}
  if (!parsed.env_variables) {
    parsed.env_variables = {}
  }

  Object
    .keys(env)
    .filter(key => key.startsWith(envPrefix))
    .forEach((key) => {
      parsed.env_variables[key.replace(envPrefix, '')] = env[key]
    })

  return YAML.stringify(parsed)
}
