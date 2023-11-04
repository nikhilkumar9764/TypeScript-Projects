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
                    <b-nav-item-dropdown right>
                        <template #button-content>
                            <em>User</em>
                        </template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
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
                { title: 'Login', to: '/login' },
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
