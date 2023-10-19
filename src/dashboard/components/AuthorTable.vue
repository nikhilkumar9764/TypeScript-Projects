<template>
    <div>
        <b-table :items="authors" :fields="fields">
            <template slot="actions" slot-scope="data">
                  <b-button @click="editAuthor(data.item)">Edit</b-button>
            </template>
        </b-table>
    </div>
    <AuthorEditModal :showModal="showModal" :editedAuthor="editedAuthor" @author-updated="updateAuthor" />
           
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
              { key : "bookCount" , label : "Number of books"} , 
              { key : "actions" , label : "Actions"}
          ]
      }
   },
   methods : {
       editAuthor(author)
       {
          //set showModal to true to show the modal
          this.showModal = true;

          //set edited author to the current author 
          this.editedAuthor = author;
       } , 
       
       updateAuthor(updatedAuthor)
       {
          const idx = this.authors.findIndex(val=> val.id === updatedAuthor.id);
          if(idx !== -1)
          {
            this.authors[idx] = updatedAuthor;
          }
       }
   }
}

</script>