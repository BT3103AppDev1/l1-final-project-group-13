<template>
    <svg-icon type="mdi" :path="path"></svg-icon>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiReply } from '@mdi/js';

export default {
    name: "reply-icon",
    components: {
        SvgIcon
    },
    data() {
        return {
            path: mdiReply,
        }
    }
}
</script>