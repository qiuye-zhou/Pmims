import { defineStore } from "pinia";

export default defineStore('User',{
    state: () => {
        return {
            Data: [],
            Token: '',
        }
    },
})