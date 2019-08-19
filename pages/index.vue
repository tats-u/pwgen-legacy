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
                  v-slider(min="0" max="120" thumb-label="always")
                  v-subheader 数字
                  v-slider(min="0" max="120" thumb-label="always")
                  v-subheader 記号
                  v-slider(min="0" max="120" thumb-label="always")
              v-row(align="center" justify="space-around")
                v-switch(label="大文字")
                v-switch(label="数字")
                v-switch(label="記号")
              v-row(align="center" justify="space-around")
                v-switch(label="!")
                v-switch(label='"')
                v-switch(label="#")
                v-switch(label="$")
                v-switch(label="%")
                v-switch(label="&")
                v-switch(label="'")
                v-switch(label="(")
                v-switch(label=")")
                v-switch(label="*")
                v-switch(label="+")
                v-switch(label=",")
                v-switch(label="-")
                v-switch(label=".")
                v-switch(label="/")
                v-switch(label=":")
                v-switch(label=";")
                v-switch(label="<")
                v-switch(label="=")
                v-switch(label=">")
                v-switch(label="?")
                v-switch(label="@")
                v-switch(label="[")
                v-switch(label='\\ ')
                v-switch(label="]")
                v-switch(label="^")
                v-switch(label="_")
                v-switch(label="`")
                v-switch(label="{")
                v-switch(label="|")
                v-switch(label="}")
                v-switch(label="~")
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
