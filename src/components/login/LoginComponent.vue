<template>
    <div class="container">
        <h2 class="text-center">Página de Login</h2>

        <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Email</label>
                <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Informe o email">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Senha</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Informe a Senha">
            </div>
            <button type="submit" class="btn btn-primary">Acessar</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "LoginComponent"
    }
</script>

<style scoped>

</style>
