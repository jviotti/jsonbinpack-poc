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

export const BYTE_BITS: number = 8
export const HALF_BYTE_BITS: number = BYTE_BITS / 2
export const UINT8_MIN: number = 0
export const UINT8_MAX: number = Math.pow(2, BYTE_BITS) - 1
export const UINT4_MIN: number = 0
export const UINT4_MAX: number = Math.pow(2, HALF_BYTE_BITS) - 1
