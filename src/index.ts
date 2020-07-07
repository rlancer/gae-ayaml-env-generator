import { Command, flags } from '@oclif/command'
import { generate } from './controller'
import fs from 'fs'

class AppYamlGenerator extends Command {
  static description = 'Generate the app.yaml file for App Engine'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    prefix: flags.string({ description: 'Enviorment varible prefix, defaults to APP_' }),
  }

  static args = [{ name: 'template' }]

  async run() {
    const { args, flags } = this.parse(AppYamlGenerator)

    const prefix = flags.prefix || 'APP_'
    const input = fs.readFileSync(0, 'utf-8')

    try {
      const output = generate({ input, envPrefix: prefix })
      process.stdout.write(output)
    } catch (err) {
      this.error(err)
    }
  }
}

export = AppYamlGenerator
