<template>
    <div class="book-modal">
        <b-modal
            v-model="show"
            @hide="handleClose"
            :title="book?.name ? 'Edit book' : 'Add book'"
            centered
            scrollable
            hide-footer
            class="mb-0"
        >
            <b-form-group label="Book Name">
                <b-form-input v-model="name"></b-form-input>
            </b-form-group>
            <b-form-group label="Number of pages">
                <b-form-input v-model="page_count"></b-form-input>
            </b-form-group>
            <b-form-group label="Author">
                <b-form-select v-model="author_id" :options="authorsOptions"></b-form-select>
            </b-form-group>
            <b-form-group class="mt-4">
                <div class="text-right">
                    <b-button class="px-4" variant="success" @click="submit">
                        {{ book?.name ? 'Update' : 'Add' }}
                    </b-button>
                </div>
            </b-form-group>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'BookModal',
    props: {
        book: {
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
            page_count: '',
            author_id: '',
            name: '',
        };
    },

    computed: {
        authors() {
            return this.$store?.state?.authors?.authors || [];
        },
        authorsOptions() {
            return (this.authors || []).map((at) => ({
                ...at,
                value: at.id,
                text: at.name,
            }));
        },
    },

    watch: {
        showModal(value) {
            this.show = value;
        },
        book(value) {
            this.initBook(value);
        },
    },

    mounted() {
        this.initBook(this.book);
    },

    methods: {
        handleClose() {
            this.resetData();
            this.$store.dispatch('fetchBooks');
            this.$emit('close');
        },
        submit() {
            try {
                const data = {
                    id: this.author?.id,
                    author_id: this.author_id,
                    page_count: this.page_count.toString(),
                    name: this.name,
                };
                if (this.book?.name) {
                    this.$emit('updateBook', data);
                } else {
                    this.$emit('addBook', data);
                }
            } catch (error) {
                console.log('error submit', error);
            }
        },
        initBook(bk) {
            this.name = bk?.name || '';
            this.page_count = bk?.page_count || '';
            this.author_id = bk?.author_id || '';
        },
        resetData() {
            this.name = '';
            this.page_count = '';
            this.author_id = '';
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
