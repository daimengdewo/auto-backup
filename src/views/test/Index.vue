<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import useCounterStore from '@/store/counterStore'

const counterStore = useCounterStore()
const { dataList } = storeToRefs()

onMounted(() => {
    counterStore.loadData()
})
</script>

<template>
    <ul>
        <li>
            <input type="text" v-model="username">
        </li>
    </ul>
</template>

<style lang="css"></style>