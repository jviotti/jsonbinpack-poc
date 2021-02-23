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

import * as CodeMirror from 'codemirror'

import {
  JSONValue
} from '../../lib/json'

import {
  JSONStats,
  JSONStatsSummary,
  summarize,
  analyze,
  qualify
} from '../../utils/jsonstats'

const editorElement: HTMLElement | null = document.getElementById('editor')
if (editorElement === null) {
  throw new Error('Editor element does not exist')
}

const code: CodeMirror.Editor = CodeMirror(editorElement, {
  lineNumbers: true,
  value: '{"foo":"bar"}',
  theme: 'idea',
  mode:  'json'
});

const buttonElement: HTMLElement | null = document.getElementById('analyze')
if (buttonElement === null) {
  throw new Error('Button element does not exist')
}

const parseJSON = (value: string): JSONValue => {
  try {
    return JSON.parse(value)
  } catch (error) {
    if (error instanceof SyntaxError) {
      document.querySelectorAll('.error-modal').forEach((element: Element) => {
        element.classList.remove('hidden')
      })
    }

    throw error
  }
}

buttonElement.addEventListener('click', () => {
  const contents: string = code.getValue()
  const json: JSONValue = parseJSON(contents)
  const stats: JSONStats = analyze(json)
  const summary: JSONStatsSummary = summarize(stats)
  console.log(stats)
  console.log(summary)
  console.log(qualify(summary))
})

const modalButtonElement: HTMLElement | null = document.getElementById('close-modal')
if (modalButtonElement === null) {
  throw new Error('Modal button element does not exist')
}

modalButtonElement.addEventListener('click', () => {
  document.querySelectorAll('.error-modal').forEach((element: Element) => {
    element.classList.add('hidden')
  })
})
