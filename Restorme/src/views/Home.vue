<template>
  <div v-if="user">
    <br />
    <br />
    <br />
    <br />
    <ResumeInputs/>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import ResumeInputs from '../components/ResumeInputs.vue';

export default {
    name: "Home",
    data() {
        return {
            user: false,
        };
    },
    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
            else {
                this.user = false;
            }
        });
    },
    components: { ResumeInputs }
};
</script>
