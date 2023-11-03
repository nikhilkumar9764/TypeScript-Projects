<template>
    <div>
        <div v-if="renderedBooks && renderedBooks.length">
            <b-table :items="bookWithSearch" :fields="fields">
                <template v-slot:cell(edit)="{ item }">
                    <b-button @click="editBook(item)">Edit</b-button>
                </template>
                <template v-slot:cell(delete)="{ item }">
                    <b-icon icon="exclamation-triangle" @click="deleteBook(item)"></b-icon>
                </template>
            </b-table>
        </div>

        <div class="mt-3 d-flex justify-content-center">
            <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                first-number
                last-number
            ></b-pagination>
        </div>
        <BookModal :show-modal="showModal" :book="editedBook" @close="closeBookModal" @updateAuthor="updateBook" />
    </div>
</template>

<script>
import BookModal from '../components/BookModal.vue';

export default {
    name: 'BookTable',
    props: {
        books: {
            type: Array,
            default: () => [],
        },
        search: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            showModal: false,
            editedBook: {},
            fields: [
                { key: 'name', label: 'Name' },
                { key: 'author_name', label: 'Author name' },
                { key: 'page_count', label: 'Number of pages' },
                { key: 'edit', label: 'Edit' },
                { key: 'delete', label: 'Delete' },
            ],
            rows: this.books.length,
            perPage: 10,
            currentPage: 1,
        };
    },
    computed: {
        renderedBooks() {
            return (this.books || []).filter((bk) => bk.page_number === this.currentPage);
        },
        bookWithSearch() {
            if (!this.search) {
                return this.renderedBooks;
            }
            return this.renderedBooks.filter((bk) => bk.name.toUpperCase().includes(this.search.toUpperCase()));
        },
    },
    methods: {
        editBook(book) {
            this.editedBook = book;
            this.showModal = true;
        },
        deleteBook(book) {
            console.log('book delete', book);
        },
        closeBookModal() {
            this.showModal = false;
        },
        updateBook(author) {
            this.$axios
                .put(`http://localhost:5000/update-authors/${author.id}`, {
                    name: author.name,
                    books: author.books,
                })
                .then(() => {
                    this.closeBookModal();
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
