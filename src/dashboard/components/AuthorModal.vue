<template>
    <div class="author-modal">
        <b-modal
            v-model="show"
            @hide="handleClose"
            :title="author?.name ? 'Edit author' : 'Add author'"
            centered
            scrollable
            hide-footer
            class="mb-0"
        >
            <b-form-group label="Author Name">
                <b-form-input v-model="name"></b-form-input>
            </b-form-group>
            <b-form-group>
                <div class="mb-2 d-flex justify-content-between align-items-end">
                    <label class="mb-0">Author Books ({{ books.length }})</label>
                </div>
                <b-table :items="books" :fields="booksTableFields">
                    <template v-slot:cell(name)="{ item }">
                        <b-form-input v-model="item.name"></b-form-input>
                    </template>
                    <template v-slot:cell(page_count)="{ item }">
                        <b-form-input v-model="item.page_count"></b-form-input>
                    </template>
                    <template v-slot:cell(actions)="{ item }">
                        <div class="text-center">
                            <b-button size="sm"><b-icon icon="trash" @click="removeBook(item)"></b-icon></b-button>
                        </div>
                    </template>
                </b-table>

                <div class="text-center mt-1">
                    <b-button variant="info" class="px-3 py-1" @click="addEmptyBook">
                        <b-icon icon="plus"> </b-icon>
                    </b-button>
                </div>
            </b-form-group>

            <b-form-group class="mt-4">
                <div class="text-right">
                    <b-button class="px-4" variant="success" @click="submit">
                        {{ author?.name ? 'Update' : 'Add' }}
                    </b-button>
                </div>
            </b-form-group>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'AuthorModal',
    props: {
        author: {
            type: Object,
            default: () => {},
        },
        showModal: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            show: false,
            name: '',
            books: [],
            booksTableFields: [
                { key: 'name', label: 'Book name' },
                { key: 'page_count', label: 'Number of pages' },
                { key: 'actions', label: 'Actions' },
            ],
        };
    },

    watch: {
        showModal(value) {
            this.show = value;
        },
        author(value) {
            this.initAuthor(value);
        },
    },

    mounted() {
        this.initAuthor(this.author);
    },

    methods: {
        handleClose() {
            this.resetData();
            this.$store.dispatch('fetchAuthors');
            this.$emit('close');
        },
        addEmptyBook() {
            this.books.push({ name: '', page_count: '', id: new Date().getTime().toString() });
        },
        removeBook(book) {
            this.books = this.books.filter((bk) => bk.id !== book.id);
        },
        submit() {
            try {
                if (!this.name) {
                    this.$bvToast.toast('Name must not be empty', {
                        title: 'Failed',
                        variant: 'danger',
                        solid: true,
                    });
                    return;
                }
                const data = {
                    id: this.author?.id,
                    books: this.books,
                    name: this.name,
                };
                if (this.author?.name) {
                    this.$emit('updateAuthor', data);
                } else {
                    this.$emit('addAuthor', data);
                }
            } catch (error) {
                console.log('error submit', error);
            }
        },
        initAuthor(at) {
            this.name = at?.name || '';
            this.books = at?.books || [];
        },
        resetData() {
            this.name = '';
            this.books = [];
        },
    },
};
</script>

<style scoped>
table {
    margin-bottom: 0 !important;
    border: 1px solid #dee2e6;
    border-collapse: collapse;
}
</style>
