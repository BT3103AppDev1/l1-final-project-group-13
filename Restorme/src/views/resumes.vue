<template>
    
<AddResume/>

</template>

<script>
import AddResume from '@/components/AddResume.vue';


export default {
    name: 'App',
    components: {
        AddResume,
    },
    data() {
        return{
        refreshComp:0
    }
    },
    methods:{
        change(){
            this.refreshComp += 1
        }
    }

}
</script>