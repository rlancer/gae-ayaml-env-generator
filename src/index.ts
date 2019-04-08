import { Command, flags } from '@oclif/command'
import { generate } from './controller';

class AppyamlGenerator extends Command {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    // flag with no value (-f, --force)
    prefix: flags.string({ char: 'p', description: 'Enviorment varible prefix, defaults to ENV_' }),
    force: flags.boolean({ char: 'f' }),
  }

  static args = [{ name: 'file' }]

  async run() {
    const { args, flags } = this.parse(AppyamlGenerator)

    const fileName = args.file || 'app.template.yaml'
    const prefix = flags.prefix || 'ENV_'

    try {
      const newFile = generate({ appYamlTemplatePath: fileName, envPrefix: prefix })
      this.log(`Generated new app.yaml
    ${newFile}`)
    } catch (err) {
      this.error(err)
    }
  }
}

export = AppyamlGenerator
