<script setup>
    import {ref,reactive} from 'vue'
    const username = ref("")
</script>

<template>
    <ul>
        <li>
            <input type="text" v-model="username">
        </li>
    </ul>
</template>

<style lang="css">

</style>