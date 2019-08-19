<template lang="pug">
v-app
  v-container
    v-row(justify="center")
      h1 パスワードジェネレータ
    v-row(justify="center" wrap)
      v-col(xs="10" sm="9" md="8")
        v-card
          v-card-title 設定
          v-card-text
            v-container
              v-row
                v-col(cols="12")
                  v-subheader アルファベット
                  v-slider(min="0" max="120" thumb-label="always" v-model="weight_alpha")
                  v-subheader 数字
                  v-slider(min="0" max="120" thumb-label="always" v-model="weight_num")
                  v-subheader 記号
                  v-slider(min="0" max="120" thumb-label="always" v-model="weight_symbol")
              v-row(align="center" justify="space-around")
                v-switch(label="大文字" v-model="uses_upper")
                v-switch(label="数字" v-model="uses_num")
                v-switch(label="記号" v-model="uses_symbol")
              v-row(align="center" justify="space-around")
                v-switch(v-for="(char, idx) in availableSymbols" :label="char" v-model="symbol_switches[idx]")
          v-card-actions(justify="center")
            v-btn(primary)
              v-icon(left) mdi-key
              | 生成
      v-col(xs="10" sm="9" md="8")
        v-card
          v-card-title 生成したパスワード
          v-card-text
            v-simple-table
              tbody
                tr
                  td
                    | AAAAAAA
                    v-btn(icon)
                      v-icon mdi-clipboard-arrow-right
</template>

<script lang="ts">
import Vue from "vue"

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
      availableSymbols,
      symbol_switches: availableSymbols.map((_) => true)
    }
  }
})
</script>
