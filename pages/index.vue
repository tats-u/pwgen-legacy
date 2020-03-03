<template lang="pug">
v-app
  v-container
    v-row(justify="center")
      h1 {{ $t("title") }}
    v-row(justify="center")
      v-col(xs="10" sm="9" md="8")
        v-card
          v-card-title {{ $t("settings") }}
          v-card-text
            v-container
              v-row
                v-subheader {{ $t("language") }}
              v-row
                v-btn-toggle(v-model="$i18n.locale" color="primary")
                  v-btn(v-for="(emoji, lang) in languageIcons" exclusive :value="lang" :to="switchLocalePath(lang)" :link="lang !== $i18n.locale" nuxt)
                    | {{ emoji }} {{ $t("languages")[lang] }}
              v-row
                v-subheader {{ $t("appearance_ratio") }}
              v-row
                v-col(cols="12")
                  v-subheader {{ $t("alphabets") }}
                  v-slider(min="0" max="120" thumb-label v-model="weight_alpha")
                    template(v-slot:append)
                      v-text-field(min="0" max="120" v-model="weight_alpha" type="number")
                  v-subheader {{ $t("digits") }}
                  v-slider(min="1" max="120" thumb-label v-model="weight_num" :disabled="!uses_num")
                    template(v-slot:append)
                      v-text-field(min="1" max="120" v-model="weight_num" type="number" :disabled="!uses_num")
                  v-subheader {{ $t("symbols") }}
                  v-slider(min="1" max="120" thumb-label v-model="weight_symbol" :disabled="!uses_symbol")
                    template(v-slot:append)
                      v-text-field(min="1" max="120" v-model="weight_symbol" type="number" :disabled="!uses_symbol")
              v-row
                v-subheader {{ $t("appearing_char_type") }}
              v-row(align="center" justify="space-around")
                v-switch(:label="$t('uppercase')" v-model="uses_upper")
                v-switch(:label="$t('digits')" v-model="uses_num")
                v-switch(:label="$t('symbols')" v-model="uses_symbol")
              v-row
                v-subheader {{ $t("appearing_symbols") }}
              v-row(align="center" justify="space-around")
                v-chip-group(multiple column active-class="primary" v-model="using_symbols_list")
                  v-chip(v-for="(char, idx) in availableSymbols" :value="char") {{ char }}
              v-row(justify="space-between")
                v-btn(@click="unifySymbolSwitchesState(false)" :disabled="!uses_symbol" color="secondary")
                  v-icon(left) mdi-toggle-switch-off
                  | {{ $t("turn_all_off") }}
                v-btn(@click="unifySymbolSwitchesState(true)" :disabled="!uses_symbol" color="secondary")
                  v-icon(left) mdi-toggle-switch
                  | {{ $t("turn_all_on") }}
                v-btn(@click.stop="openSymbolConfigDialog()" :disabled="!uses_symbol" color="secondary")
                  v-icon(left) mdi-keyboard
                  | {{ $t("config_from_kb")}}
              v-row
                v-col(cols="12")
                  v-subheader {{ $t("pass_len") }}
                  v-slider(min="8" max="128" thumb-label v-model="passwordLength")
                    template(v-slot:append)
                      v-text-field(min="8" max="128" v-model="passwordLength" type="number")
              v-row(align="center" justify="space-around")
                v-col(cols="12")
                  v-chip-group(column active-class="primary" v-model="passwordLength")
                    v-chip(v-for="(len, idx) in candicatePasswordLengths" :value="len") {{ len }}
              v-row
                v-col(cols="12")
                  v-subheader {{ $t("pass_gen_num") }}
                  v-select(v-model="passwordGenerateCount" :items="candicatePasswordGenerateCounts")
          v-card-actions
            v-spacer
            v-btn(color="primary" @click="generatePasswords()")
              v-icon(left) mdi-key
              | {{ $t("generate") }}
    v-row(justify="center")
      v-col(xs="10" sm="9" md="8")
        v-card
          v-card-title {{ $t("generated_pass") }}
          v-card-text
            p(v-if="!generatedPasswords.length") {{ $t("not_yet_generated") }}
            v-simple-table
              tbody
                tr(v-for="(pass, idx) in generatedPasswords")
                  td
                    span.font-monospace {{pass}}
                    v-tooltip(right)
                      template(v-slot:activator="{on}")
                        v-btn(icon @click="copyToClipboard(pass)" v-on="on")
                          v-icon mdi-clipboard-arrow-right
                      span {{ $t("copy") }}
    v-row(justify="center")
      v-dialog(v-model="isSymbolConfigDialogOpened" max-width="600")
        v-card
          //- Hack: Use @submit."prevent" to prevent reloading by submitting
          v-form(@submit.prevent="setSymbolSwitchesFromStr")
            v-card-title.headline {{ $t("input_symbols_from_kb") }}
            v-card-text
              v-text-field(v-model="usingSymbolListString" ref="usingSymbolListString" :hint="$t('input_symbols_from_kb_hint')")
            v-card-actions(justify="center")
              v-spacer
              v-btn(@click="isSymbolConfigDialogOpened = false" text)
                v-icon(left) mdi-close
                | {{ $t("cancel") }}
              v-btn(color="primary" type="submit" text)
                v-icon(left) mdi-check
                | OK
    v-layout.fixed-bottomright
      .text-center
        .fab-margin
          v-btn(fab color="cyan" dark href="https://twitter.com/intent/tweet?url=https%3A%2F%2Ftats-u.github.io%2Fpwgen%2F" target="_blank")
            v-icon mdi-twitter
        .fab-margin
          v-btn(fab color="green" dark href="https://github.com/tats-u/pwgen/")
            v-icon mdi-github-circle
</template>

<i18n lang="yaml">
en:
  title: Password Generator
  settings: Settings
  appearance_ratio: Appearance Ratio
  alphabets: Alphabets
  digits: Digits
  symbols: Symbols
  uppercase: Uppercase Letters
  appearing_char_type: Appearing Character Type
  appearing_symbols: Appearing Symbols
  turn_all_on: Turn All On
  turn_all_off: Turn All Off
  config_from_kb: Configure from Keyboard
  input_symbols_from_kb: Input symbols ONLY to be contained
  input_symbols_from_kb_hint: Duplicatied symbols and non-symbol characters will be ignored.
  cancel: Cancel
  pass_len: Password Length
  pass_gen_num: Number of Passwords to Generate
  generate: Generate
  generated_pass: Generated Passwords
  copy: Copy
  not_yet_generated: Press the above “GENERATE” button and passwords will be listed here.
  language: Language
  languages:
    en: English
    ja: Japanese (日本語)
ja:
  title: パスワードジェネレータ
  settings: 設定
  appearance_ratio: 出現比
  alphabets: アルファベット
  digits: 数字
  symbols: 記号
  uppercase: 大文字
  appearing_char_type: 出現文字種
  appearing_symbols: 出現記号
  turn_all_on: 全てオン
  turn_all_off: 全てオフ
  config_from_kb: キーボードから設定
  input_symbols_from_kb: 出現させたい記号だけを入力
  input_symbols_from_kb_hint: 記号の重複や、記号以外の文字は無視されます
  cancel: キャンセル
  pass_len: パスワード長
  pass_gen_num: パスワード生成数
  generate: 生成
  generated_pass: 生成したパスワード
  copy: コピー
  not_yet_generated: 上の「生成」ボタンを押すと、生成されたパスワードが表示されます
  language: 言語
  languages:
    en: 英語 (English)
    ja: 日本語
</i18n>

<style lang="sass">
.font-monospace
  font-family: Consolas, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace
.fixed-bottomright
  position: fixed
  bottom: 0
  right: 0
.fab-margin
  margin: 15px
</style>

<script lang="ts">
import Vue from "vue"
import * as randomNumber from "random-number-csprng"

/**
 * Equivalent to Python's range.
 *
 * [start, end)
 *
 * @param start start number
 * @param end end number (itself isn't contained in the result)
 */
function range(start: number, end: number): Array<number> {
  return [...Array(end - start).keys()].map((val) => val + start)
}

/**
 * Returns the ASCII code of the given character.
 */
function ord(char: string): number {
  return char.charCodeAt(0)
}

/**
 * sequencedChars("AE03wz") = "ABCDE0123wxyz"
 */
function sequencedChars(chars: string): string {
  /**
   * slicePairs("abcdef") = ["ab", "cd", "ef"]
   */
  function slicePairs(str: string): string[] {
    return range(0, Math.floor(str.length / 2))
      .map((i) => i * 2)
      .map((start) => str.slice(start, start + 2))
  }
  return slicePairs(chars)
    .map(([start, end]) =>
      String.fromCharCode(...range(ord(start), ord(end) + 1))
    )
    .join("")
}

interface Indexable<T> {
  [index: number]: T
  length: number
}

function accumulate(list: Array<number>): Array<number> {
  return list.map(((sum) => (value) => (sum += value))(0))
}

async function chooseOneAsync<T>(
  list: Indexable<T>,
  weights?: Array<number>
): Promise<T> {
  if (list.length === 1) return list[0]
  if (weights && weights.length) {
    const accumulatedWeights = accumulate(weights)
    const n = await randomNumber(
      0,
      accumulatedWeights[accumulatedWeights.length - 1] - 1
    )
    const m = accumulatedWeights.findIndex(
      (sum, i, sums) => (i === 0 ? true : sums[i - 1] <= n) && n < sum
    )
    if (m !== -1) return list[m]
  }
  return list[await randomNumber(0, list.length - 1)]
}

function emptyArray<T>(): Array<T> {
  return []
}

interface PasswordGeneratorOptions {
  passwordLength: number
  usesUppers: boolean
  usesNumbers: boolean
  usesSymbols: boolean
  weightAlphas: number
  weightNumbers: number
  weightSymbols: number
  usingSymbolsList: string
}

class PasswordGenerator {
  protected option: PasswordGeneratorOptions
  static lowerList: string = sequencedChars("az")
  static upperList: string = sequencedChars("AZ")
  static digitsList: string = sequencedChars("09")

  constructor(option: PasswordGeneratorOptions) {
    this.option = option
  }

  public async generateOne(): Promise<string> {
    const usingSymbolsList = this.option.usingSymbolsList
    const charListsList = [
      PasswordGenerator.lowerList,
      PasswordGenerator.upperList,
      PasswordGenerator.digitsList,
      usingSymbolsList
    ]
    // p(lower) /= 2 and p(upper) /= 2.
    // weights must be integers, so p(num) *= 2 and p(symbol) *= 2 instead.
    const numSymbolWeightCoef = this.option.usesUppers ? 2 : 1
    const charTypeWeights = [
      this.option.weightAlphas,
      this.option.usesUppers ? this.option.weightAlphas : 0,
      this.option.usesNumbers
        ? this.option.weightNumbers * numSymbolWeightCoef
        : 0,
      this.option.usesSymbols && usingSymbolsList.length
        ? this.option.weightSymbols * numSymbolWeightCoef
        : 0
    ]
    return (
      await Promise.all(
        Array(this.option.passwordLength)
          .fill(null)
          .map(async () => {
            const ret = await chooseOneAsync(
              await chooseOneAsync(charListsList, charTypeWeights)
            )
            return ret
          })
      )
    ).join("")
  }
}

export default Vue.extend({
  data() {
    const availableSymbols = [...sequencedChars("!/:@[`{~")]
    return {
      uses_upper: true,
      uses_num: true,
      uses_symbol: true,
      weight_alpha: 60,
      weight_num: 60,
      weight_symbol: 60,
      passwordLength: 16,
      passwordGenerateCount: 10,
      candicatePasswordGenerateCounts: [1, 5, 10, 20, 50, 100],
      candicatePasswordLengths: [8, 16, 24, 32, 48, 64, 80, 96, 128],
      availableSymbols,
      using_symbols_list: availableSymbols,
      isSymbolConfigDialogOpened: false,
      usingSymbolListString: "",
      generatedPasswords: emptyArray<string>(),
      languageIcons: {
        en: "🌐",
        ja: "🇯🇵"
      }
    }
  },
  methods: {
    copyToClipboard(pass: string) {
      // @ts-ignore
      this.$copyText(pass)
    },
    async generatePasswords() {
      const passwordsArray: string[] = []
      // Hash table to reduce the order of detecting duplicates
      const passwordsSet: Set<string> = new Set()

      const passwordGenerator = new PasswordGenerator({
        passwordLength: this.passwordLength,
        usesUppers: this.uses_upper,
        usesNumbers: this.uses_num,
        usesSymbols: this.uses_symbol,
        weightAlphas: this.weight_alpha,
        weightNumbers: this.weight_num,
        weightSymbols: this.weight_symbol,
        usingSymbolsList: this.using_symbols_list.join("")
      })

      for (let i = 0; i < this.passwordGenerateCount; ++i) {
        let justGenerated: string
        do {
          justGenerated = await passwordGenerator.generateOne()
        } while (passwordsSet.has(justGenerated))
        passwordsArray.push(justGenerated)
        passwordsSet.add(justGenerated)
      }
      this.generatedPasswords = passwordsArray
    },
    unifySymbolSwitchesState(state: boolean) {
      this.using_symbols_list = state ? this.availableSymbols : []
    },
    openSymbolConfigDialog() {
      this.usingSymbolListString = ""
      this.isSymbolConfigDialogOpened = true
      // @ts-ignore
      this.$nextTick(() => this.$refs.usingSymbolListString.focus())
    },
    setSymbolSwitchesFromStr() {
      this.using_symbols_list = this.availableSymbols.filter((char) =>
        this.usingSymbolListString.includes(char)
      )
      this.isSymbolConfigDialogOpened = false
      this.usingSymbolListString = ""
    }
  }
})
</script>
