<template>
    <div>
        <h1>Authors</h1>
        <div class="mb-4 d-flex">
            <div class="mr-4">
                <b-form-input v-model="searchAuthorValue" placeholder="Search by author name"></b-form-input>
            </div>
            <b-button variant="success" @click="showModalAuthor = true">Add Author</b-button>
        </div>
        <AuthorTable v-if="authorsRendered && authorsRendered.length" :authors-data="authorsRendered"></AuthorTable>
        <AuthorModal :show-modal="showModalAuthor" @close="closeModalAuthor" @addAuthor="addAuthor" />
    </div>
</template>

<script>
import AuthorTable from '~/components/AuthorTable.vue';
import AuthorModal from '../components/AuthorModal.vue';

export default {
    layout: 'default',
    name: 'AuthorsPage',
    data() {
        return {
            searchAuthorValue: '',
            showModalAuthor: false,
        };
    },
    computed: {
        authorsRendered() {
            if (!this.searchAuthorValue) {
                return this.authors;
            }
            return this.authors.filter((at) => at.name.toUpperCase().includes(this.searchAuthorValue.toUpperCase()));
        },
        authors() {
            return (this.$store?.state?.authors?.authors || []).map((author) => ({
                ...author,
                number_of_books: author.books.length,
            }));
        },
    },
    beforeMount() {
        this.fetchAuthors();
    },
    methods: {
        async fetchAuthors() {
            this.$store.dispatch('fetchAuthors');
        },
        closeModalAuthor() {
            this.showModalAuthor = false;
        },
        async addAuthor(author) {
            this.$axios
                .post(`http://localhost:5000/add-author`, {
                    name: author.name,
                })
                .then(() => {
                    this.closeModalAuthor();
                    this.$store.dispatch('fetchAuthors');
                    this.$bvToast.toast('Add author success', {
                        title: 'Success',
                        variant: 'success',
                        solid: true,
                    });
                })
                .catch((error) => {
                    this.$bvToast.toast(error?.message || 'Something wrong', {
                        title: 'Failed',
                        variant: 'danger',
                        solid: true,
                    });
                });
        },
    },
    components: { AuthorTable, AuthorModal },
};
</script>
