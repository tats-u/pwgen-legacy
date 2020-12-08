<script lang="ts">
// Redirection (avoiding 404 for Japanese users)
import Vue from "vue"

export default Vue.extend({
  fetch({ redirect }) {
    redirect(301, "/")
  },
})
</script>
