<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <router-link class="navbar-brand" to="/">App Vendas</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/usuarios">Usuários</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/produtos">Produtos</router-link>
                    </li>
                </ul>
                <ul v-if="user" class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link">{{user.name}}</a>
                    </li>
                    <li class="nav-item">
                        <a href="" @click.prevent="logout" class="nav-link">Sair</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "NavBarComponent",
        props: ['user'],
        methods:{
            logout () {
                this.$emit('LOGOUT');
            }
        }
    }
</script>

<style scoped>

</style>
