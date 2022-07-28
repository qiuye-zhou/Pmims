import { defineStore } from "pinia";

export default defineStore('Meun',{
    state: () => {
        return {
            isCollapse: false,
            meunshow: {},
            Breadcrumb: []
        }
    },
})