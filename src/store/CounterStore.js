import { defineStore } from "pinia";
import axios from "axios";

const useCounterStore = defineStore("counterStore", {
  state() {
    return {
      resList: [],
      baiduToken: "",
      baiduTokenType: true,
    };
  },
  actions: {
    //异步加载数据
    async loadData() {
      this.resList = await window.electronAPI.getResList();
      this.baiduTokenType = await window.electronAPI.getTokenType("baidu");
      this.baiduToken = await window.electronAPI.getToken("baidu");
    },
  },

  getters: {},
});

export const counterStore = useCounterStore;
