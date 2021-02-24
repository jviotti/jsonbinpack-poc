/*
 * Copyright 2021 Juan Cruz Viotti
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as fs from 'fs'
import {
  JSONValue
} from '../lib/json'

import {
  JSONStats,
  analyze,
  summarize,
  qualify
} from '../utils/jsonstats'

const COMMAND: string | undefined = process.argv[2]
const FILE: string | undefined = process.argv[3]

const help = (): void => {
  const commands: string = '<analyze|summarize|qualify>'
  console.error(
    `Usage: ${process.argv[0]} ${process.argv[1]} ${commands} <file>`)
}

if (typeof COMMAND === 'undefined' || typeof FILE === 'undefined') {
  help()
  process.exit(1)
}

// From https://github.com/sindresorhus/strip-bom/blob/main/index.js
const normalize = (value: string): string => {
  if (value.charCodeAt(0) === 0xFEFF) {
		return value.slice(1)
	}

  return value
}

const json: JSONValue = JSON.parse(normalize(fs.readFileSync(FILE, 'utf8')))

const stats: JSONStats = analyze(json)

if (COMMAND === 'analyze') {
  console.log(JSON.stringify(stats, null, 2))
} else if (COMMAND === 'summarize') {
  console.log(JSON.stringify(summarize(stats), null, 2))
} else if (COMMAND === 'qualify') {
  console.log(JSON.stringify(qualify(summarize(stats)), null, 2))
} else {
  help()
  process.exit(1)
}
