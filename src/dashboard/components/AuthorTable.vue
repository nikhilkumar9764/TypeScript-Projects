<template>
    <div>
        <div>
            <b-table :items="authors" :fields="fields" >
                <template v-slot:cell(edit) = "{item}">
                    <b-button @click="editAuthor(item)">Edit</b-button>
                </template>
                <template v-slot:cell(delete) = "{item}"> 
                    <b-icon icon="exclamation-triangle" @click="deleteAuthor(item)"></b-icon>
                 </template>
           </b-table>   
        </div>
        <AuthorEditModal v-if="showModal" :showModal="showModal" :editedAuthor="editedAuthor" :o1="editedAuthor" @author-updated="updateAuthor" />
    </div>
</template>


           

<script>
export default
{
   props : {
       authors : Array
   },
   data()
   {
      return {
         showModal : false, 
         editedAuthor : null , 
         authors : [],
          fields : [
              {key : 'name' , label : "Name"} , 
              { key : "books" , label : "Name of books"} , 
              { key : "Edit" , label : "Edit"} , 
              { key : "Delete" , label : "Delete"}
          ]
      }
   },
   methods : {
       editAuthor(author)
       {
          this.showModal = true;
          this.editedAuthor = author;
       } , 
       
       updateAuthor(updatedAuthor)
       {
        console.log(updatedAuthor);
          const idx = this.authors.findIndex(val=> val.id === updatedAuthor.id);
          if(idx !== -1)
          {
            this.authors[idx] = updatedAuthor;
          }
       },

       deleteAuthor(author)
       {
          const idx = this.authors.findIndex(x1 => x1.id === author.id);
          if(idx!==-1)
          {
              this.authors.splice(idx,1);
          }
       }
   }
}

</script>