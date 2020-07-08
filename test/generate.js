import t from 'tap'
import generate from '../lib/generate.js'

t.test('generates from empty', t => {
  const out = generate('', 'APP_', { APP_EXAMPLE: 'example' })
  t.matchSnapshot(out, 'example')
  t.end()
})
