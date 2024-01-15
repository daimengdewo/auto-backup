<script setup>
    import {ref,reactive} from 'vue'
    const count = ref(0)
    const handleClick = () => {
        count.value++
    }
    const raw = ref('<h1>测试</h1>')
    const object = ref({
        id: '001',
        class: 'box'
    })
</script>

<template>
    <div>
        {{count}}
        <button @click="handleClick">ADD</button>
    </div>
    <div v-html="raw"></div>
    <div :="object">object</div>
</template>

<style lang="css">

</style>