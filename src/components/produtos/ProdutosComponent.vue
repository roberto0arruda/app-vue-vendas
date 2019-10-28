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
  name: 'ProdutosComponent',
  components: { TemplatePrincipal },
  data () {
    return {
      msg: 'Página de Produtos',
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
