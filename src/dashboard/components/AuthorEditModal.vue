<template>
    <b-modal v-model="showModal" title="Edit Author">
       <b-form id = "x1" @submit.prevent="saveAuthor">

           <b-form-group label="Author Name" label-for="edit-author-name">
               <b-form-input style='width: 120px' id= "edited-author-name" v-model="editedAuthor.name"></b-form-input>
           </b-form-group>

           <b-form-group label="Books written" label-for="edit-books-written">
               <div style = "max-width: 600px;" id= "edited-author-books" v-for="val in editedAuthor.books">
                  <b-form-input style='width: 120px' v-model="val.name"></b-form-input>
                  <b-form-input style='width: 120px' v-model="val.page_count"></b-form-input>
               </div>
           </b-form-group>

           <b-button type="submit" variant="primary">Submit</b-button>
           <b-button type="reset" variant="danger">Reset</b-button>
       </b-form>
    </b-modal>
</template>


<script>
import axios from 'axios';
   export default {
      props: {
         showModal : Boolean , 
         editedAuthor : Object
      } , 
      methods: {
        async saveAuthor()
         {
             console.log(this.editedAuthor);
             try{
                 await axios.put(`http://localhost:5000/update-authors/${this.editedAuthor.id}`, {
                    name : this.editedAuthor.name , 
                    books : this.editedAuthor.books
                 });
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