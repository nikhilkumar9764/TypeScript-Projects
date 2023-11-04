<template>
    <div>
        <div>
            <b-table :items="authors" :fields="fields">
                <template v-slot:cell(edit)="{ item }">
                    <b-button @click="editAuthor(item)">Edit</b-button>
                </template>
                <template v-slot:cell(delete)="{ item }">
                    <b-icon icon="exclamation-triangle" @click="deleteAuthor(item)"></b-icon>
                </template>
            </b-table>
        </div>

        <AuthorModal
            :show-modal="showModal"
            :author="editedAuthor"
            @close="closeModalAuthor"
            @updateAuthor="updateAuthor"
        />
    </div>
</template>

<script>
import AuthorModal from '../components/AuthorModal.vue';

export default {
    props: {
        authorsData: Array,
    },
    data() {
        return {
            showModal: false,
            editedAuthor: null,
            authors: [],
            fields: [
                { key: 'name', label: 'Name' },
                { key: 'number_of_books', label: 'Number of books' },
                { key: 'Edit', label: 'Edit' },
                { key: 'Delete', label: 'Delete' },
            ],
        };
    },
    watch: {
        authorsData(value) {
            this.authors = value || [];
        },
    },
    mounted() {
        this.authors = this.authorsData || [];
    },
    methods: {
        editAuthor(author) {
            this.showModal = true;
            this.editedAuthor = author;
        },
        deleteAuthor(author) {
            this.$axios
                .delete(`http://localhost:5000/delete-authors/${author.id}`)
                .then(() => {
                    this.$store.dispatch('fetchAuthors');
                    this.$bvToast.toast('Delete author success', {
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
        closeModalAuthor() {
            this.showModal = false;
        },
        updateAuthor(author) {
            this.$axios
                .put(`http://localhost:5000/update-authors/${author.id}`, {
                    name: author.name,
                    books: author.books,
                })
                .then(() => {
                    this.closeModalAuthor();
                    this.$store.dispatch('fetchAuthors');
                    this.$bvToast.toast('Update author success', {
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
        closeModalAuthor() {
            this.showModal = false;
        },
        updateAuthor(author) {
            this.$axios
                .put(`http://localhost:5000/update-authors/${author.id}`, {
                    name: author.name,
                    books: author.books,
                })
                .then(() => {
                    this.closeModalAuthor();
                    this.$store.dispatch('fetchAuthors');
                    this.$bvToast.toast('Update author success', {
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
};
</script>

<style>
th {
    white-space: nowrap;
}
</style>
