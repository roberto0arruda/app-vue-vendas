<template>
    <div>
        <nav-bar-component></nav-bar-component>
        <slot/>
    </div>
</template>

<script>
    import NavBarComponent from '@/components/layouts/NavBarComponent'

    export default {
        name: "TemplatePrincipal",
        components: { NavBarComponent }
    }
</script>

<style scoped>

</style>
