<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <nuxt-link to="/" class="text-white text-uppercase mr-4" style="font-weight: bold">DASHBOARD</nuxt-link>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <nuxt-link
                        v-for="(item, index) in links"
                        :key="`nav-item-${index}`"
                        :to="item.to"
                        class="px-4 text-white"
                    >
                        {{ item.title }}
                    </nuxt-link>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <nuxt-link to="/login" class="px-4 text-white"> Login </nuxt-link>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: 'Navbar',

    data() {
        return {
            links: [
                { title: 'Home', to: '/' },
                { title: 'Authors', to: '/authors' },
                { title: 'Books', to: '/books' },
            ],
        };
    },
};
</script>

<style>
.nuxt-link-exact-active {
    font-weight: bold;
}
</style>
