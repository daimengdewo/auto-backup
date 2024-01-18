import { defineStore } from "pinia";
import axios from "axios";

const useCounterStore = defineStore('counterStore', {
    state() {
        return {
            dataList: [],
            test: ""
        }
    },
    actions: {
        //异步加载数据
        async loadData() {
            let result = await axios.get('')
            this.dataList = result.data

            // axios.post('', {
            //     id: '1'
            // })
        }
    },

    getters: {
        total() {

        }
    }
})

export const counterStore = useCounterStore