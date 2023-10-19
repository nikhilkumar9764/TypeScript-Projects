<template>
    <b-modal v-model="showModal" title="Edit Author">
       <b-form @submit="saveAuthor">
           <b-form-group label="Author Name" label-for="edit-author-name">
               <b-form-input v-model="editedAuthor.name"></b-form-input>
           </b-form-group>
       </b-form>
    </b-modal>
</template>


<script>
   export default {
      props: {
         showModal : Boolean , 
         editedAuthor : Object
      } , 

      methods: {
        async saveAuthor()
         {
             try{
                 await axios.put(`/authors/${this.editedAuthor.id}`, {
                    name : this.editedAuthor.name
                 });

                 this.showModal = false;
                 this.emit('author-updated' , this.editedAuthor);
             }
             catch(err)
             {
                console.log("Error saving the author" , err);
             }
         }
      }

   }
</script>