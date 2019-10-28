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
                    <input type="password" class="form-control" id="exampleInputPassword1" @keypress.enter="login" placeholder="Informe a Senha" v-model="dataSubmit.password">
                </div>
                <el-button type="primary" :loading="btnActive" @click="login"><i class="el-icon-success"></i> {{btnTitulo}}</el-button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LoginComponent",
        data () {
            return {
                dataSubmit : { email:'', password:'' },
                btnActive: false,
                btnTitulo: 'Acessar'
            }
        },
        created () {
            let userAux = sessionStorage.getItem('user');
            if (userAux) {
                this.$router.push('/');
            }
        },
        methods: {
            login() {
                this.btnActive = true;
                this.btnTitulo = 'Aguarde';
                this.$http.post(this.$urlAPI+`login`, this.dataSubmit)
                    .then(function (response) {
                        //Login com Sucesso
                        if (response.data.token) {
                            sessionStorage.setItem('user', JSON.stringify(response.data));
                            this.$router.push('/');
                        } else if (response.data.status === false) {
                            //Login Incorreto
                            this.$notify({title: 'Alerta', message: '- Usuário ou Senha Incorretos!', type: 'error', dangerouslyUseHTMLString: true});
                        }
                    }.bind(this))
                    .catch(function (e) {
                        ////Erros de Validação
                        this.$alertaValidacao(e);
                    }.bind(this)).finally(()=>{
                        this.btnActive = false;
                        this.btnTitulo = 'Acessar';
                });
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
