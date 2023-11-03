<template>
    <div>
        <h1>Books</h1>
        <div class="mb-4 d-flex">
            <div class="mr-4">
                <b-form-input v-model="searchBookValue" placeholder="Search by book name"></b-form-input>
            </div>
            <b-button variant="success" @click="showModal = true">Add Book</b-button>
        </div>
        <BookTable
            v-if="bookWithPageNumber && bookWithPageNumber.length"
            :books="bookWithPageNumber"
            :search="searchBookValue"
        />
        <BookModal :show-modal="showModal" @close="showModal = false" @addBook="addBook" />
    </div>
</template>

<script>
import BookTable from '~/components/BookTable.vue';

export default {
    name: 'BooksPage',
    data() {
        return {
            searchBookValue: '',
            showModal: false,
        };
    },
    computed: {
        books() {
            return this.$store?.state?.books?.books || [];
        },
        authors() {
            return this.$store?.state?.authors?.authors || [];
        },
        renderBooks() {
            return (this.books || []).map((book) => {
                const foundAuthor = (this.authors || []).find((at) => at.id === book.author_id);
                return { ...book, author_name: foundAuthor?.name || '' };
            });
        },
        bookWithPageNumber() {
            return (this.renderBooks || []).map((item, index) => {
                const n = (index + 1) / 10;
                return { ...item, page_number: Math.ceil(n) };
            });
        },
        bookWithSearch() {
            if (!this.searchBookValue) {
                return this.bookWithPageNumber;
            }
            return this.bookWithPageNumber.filter((bk) =>
                bk.name.toUpperCase().includes(this.searchBookValue.toUpperCase())
            );
        },
    },
    mounted() {
        this.$store.dispatch('fetchBooks');
        this.$store.dispatch('fetchAuthors');
    },

    methods: {
        addBook(book) {
            console.log('addBook :>> ', book);
            this.$axios
                .post(`http://localhost:5000/add-book`, {
                    author_id: book.author_id,
                    page_count: book.page_count,
                    name: book.name,
                })
                .then(() => {
                    this.showModal = false;
                    this.$store.dispatch('fetchBooks');
                    this.$bvToast.toast('Add book success', {
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
