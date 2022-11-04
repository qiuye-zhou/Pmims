import { defineStore } from "pinia";
import { RouteRecordName } from "vue-router";

export default defineStore('Meun',{
    state: () => {
        return {
            isCollapse: false,
            meunshow: {},
            tabs: []
        }
    },
    actions: {
        setmeun(meun: RouteRecordName) {
            this.meunshow = meun
        },
      },
})