<template>
  <template-principal>
    <div class="container-fluid">
      <h2>{{ msg }}</h2>
    </div>
  </template-principal>
</template>

<script>
import TemplatePrincipal from '@/templates/TemplatePrincipal'

export default {
  name: 'HomeComponent',
  components: { TemplatePrincipal },
  data () {
    return {
      msg: 'Página Home',
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
