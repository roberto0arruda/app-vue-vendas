<template>
    <div>
        <nav-bar-component :user="user" @LOGOUT="logout"></nav-bar-component>
        <slot/>
    </div>
</template>

<script>
    import NavBarComponent from '@/components/layouts/NavBarComponent'

    export default {
        name: "TemplatePrincipal",
        components: { NavBarComponent },
        data () {
            return {
                user: false
            }
        },
        created() {
            let userAux = sessionStorage.getItem('user');

            if (userAux) {
                this.user = JSON.parse(userAux);
            } else {
                this.$router.push('/login');
            }

        },
        methods: {
            logout () {
                sessionStorage.clear();
                this.user = false;
                this.$router.push('/login');
            }
        }
    }
</script>

<style scoped>

</style>
