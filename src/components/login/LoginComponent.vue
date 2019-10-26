<template>
    <div class="container">
        <div class="area">
            <h2 class="text-center">Página de Login</h2>
            <form @submit.prevent="login">
                <div class="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Informe o email" v-model="dataSubmit.email">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Senha</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Informe a Senha" v-model="dataSubmit.password">
                </div>
                <button type="submit" class="btn btn-primary">Acessar</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "LoginComponent",
        data () {
            return {
                dataSubmit : { email:'', password:'' }
            }
        },
        methods: {
            login() {
                axios.post(`http://127.0.0.1:8000/api/login`, this.dataSubmit)
                    .then(function (response) {
                        // eslint-disable-next-line no-console
                        console.log(response);
                    }.bind(this))
                    .catch(function (error) {
                        this.$notify({title: 'Alerta', message: error.response.data.errors, type: 'error', dangerouslyUseHTMLString: true});
                    }.bind(this));
            }
        }
    }
</script>

<style scoped>
.area {
    width: 400px;
    margin: auto;
}
</style>
