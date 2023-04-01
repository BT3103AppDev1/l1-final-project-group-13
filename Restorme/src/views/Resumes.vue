<template>
    <div v-if="user">
        <br />
        <br />
        <br />
        <br />
        <div class = "resumeComponents">
            <FilterResumes/>
        </div>
        <div class = "resumeComponents">
            <AllResumes/>
        </div>
        
    </div>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import AllResumes from '../components/AllResumes.vue';
import FilterResumes from '../components/FilterResumes.vue';

export default {
    name: "Resumes",
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
    components: { AllResumes, FilterResumes },
    props: ['resume']
};

</script>

<style scoped>
.resumeComponents {
    display: inline;
}
</style>