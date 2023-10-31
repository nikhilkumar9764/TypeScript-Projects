<template>
    <b-modal v-model="showModal" title="Edit Author" v-on:before-open="openmodal()">
       <b-form @submit="saveAuthor">

           <b-form-group label="Author Name" label-for="edit-author-name">
               <b-form-input v-model="editedAuthor.name"></b-form-input>
           </b-form-group>

           <b-form-group label="Books written" label-for="edit-books-written">
               <div v-for ="val in editedAuthor.books">
                  <b-form-input v-model="val.name"></b-form-input>
                  <b-form-input v-model="val.page_count"></b-form-input>
               </div>
           </b-form-group>

           <b-button type="submit" variant="primary">Submit</b-button>
           <b-button type="reset" variant="danger">Reset</b-button>
       </b-form>
    </b-modal>
</template>


<script>
   export default {
      props: {
         showModal : Boolean , 
         editedAuthor : Object,
         o1 : Object
      } , 
      
      data :{

      },
      methods: {
        openmodal()
        {
           console.log(this.editedAuthor);
        },
        async saveAuthor()
         {
             try{
               console.log("Save author called");
                console.log(this.o1);
                await axios.put(`http://localhost:5000/update-authors/${this.editedAuthor.id}`, {
                    name : this.o1.name , 
                    books : this.o1.books
                 });
                 console.log(this.resp);
                 this.$emit('author-updated' , this.editedAuthor);
             }
             catch(err)
             {
                console.log("Error saving the author" , err);
             }
         }
      }

   }
</script>