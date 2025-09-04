import { test } from 'node:test'
import * as assert from 'node:assert'
import { build } from '../helper'

// Tests the /v1/health endpoint exposed via ts-rest contract implementation

test('health endpoint', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/v1/health'
  })

  assert.strictEqual(res.statusCode, 200)
  assert.deepStrictEqual(JSON.parse(res.payload), { ok: true })
})
