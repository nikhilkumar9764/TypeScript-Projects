<template>
    <div class="default-layout">
        <NavBar />
        <div class="p-4">
            <nuxt />
        </div>
    </div>
</template>

<script>
import NavBar from '~/components/NavBar.vue';

export default {
    name: 'DefaultLayout',
    data() {
        return {
            test: 1,
        };
    },
};
</script>

<style></style>
