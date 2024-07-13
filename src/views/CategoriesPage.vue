<script setup>
import { ref } from "vue";
import axiosCustom from "@/axiosConf";  // Подставьте путь к вашему axios-конфигурации
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';




// ~~~~~~~~~~~~~~~~~~~~~~~~~~open closed Modals(add edit delete)~~~~~~~~~~~~~~~~~~
const modaladd = ref(false);
function addmodal(item) {
  modaladd.value = item;
}
const modaledit = ref(false);
function editmodal(item){
  modaledit.value = item
}
const modaldelete = ref(false);
function deletemodal(item) {
  modaldelete.value = item;
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~fetch products view~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const products = ref([]);
async function fletchcard() {
  try {
    const response = await axiosCustom.get("categories/");
    products.value = response.data?.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}
fletchcard();
//~~~~~~~~~~~IDTOVAR~~~//
const idtovar = ref("")

//~~~~~~~~~~~~~~~~~~~~~ ADD Product~~~~~~~~~~~~~~~~~~~~~~~~~
const name = ref("");
const description = ref("");
// const generateRandomParentId = () => {
//   return Math.floor(Math.random() * 100);
// }

const addProduct = async () => {
  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("description", description.value);
  // formData.append("parent_id", generateRandomParentId());  
  
  try {
    await axiosCustom.post(`categories/`, formData);
    toast.success("Added new category successfully", {
      autoClose: 2000,
      theme: "colored"
    });
    document.getElementById("myFormCategory").reset();
    addmodal(false);
    fletchcard();
  } catch (error) {
    toast.error(`Error: ${error}`, {
      autoClose: 2000,
      theme: "colored"
    });
    console.error('Error adding category:', error);
  }
}




//~~~~~~~~~~~~~~~~~~~~~ EDIT Product~~~~~~~~~~~~~~~~~~~~~~~~~


const inputname = ref("")
const inputdescription = ref("")

const data = ref(
  { 
    name:"",
    description:"",
  }
);

const editProduct =(item) =>{
  editmodal(true)
  idtovar.value = item.id,
  inputname.value = item.name,
  inputdescription.value = item.description,
  onChange() 
}

function onChange(){
   data.value.name = inputname.value,
   data.value.description = inputdescription.value
}

const editChangeProduct = async ()=>{
  onChange()
  const formData = new FormData();
 formData.append('name',data.value.name);
 formData.append('description', data.value.description);
  try {
    await axiosCustom.put(`categories/${idtovar.value}`,formData, {
    });
    toast.success("Category is edited successfully", {
      autoClose: 2000,
      theme: "colored"
    });
        fletchcard();
        editmodal(false)
  } catch (error) {
    toast.error(`Error: ${error}`, {
      autoClose: 2000,
      theme: "colored"
    });
  }
}



//~~~~~~~~~~~~~~~~~~~~~~~~~~DELET Product~~~~~~~~~~~~~~~~~~~~~~~~
const tovarid = (id) =>{
  deletemodal(true)
  idtovar.value = id
}
const deleteProduct = async ()=>{
  try {
    await axiosCustom.delete(`categories/${idtovar.value}`)
    toast.success("Category is deleted successfully", {
      autoClose: 2000,
      theme: "colored"
    });
    fletchcard();
    deletemodal(false)
  } 
  catch(error){
    toast.error(`Error: ${error}`, {
      autoClose: 2000,
      theme: "colored"
    });

  }
}












const columns = [
  {
    title:'№',
    dataIndex: '№',
  },
  {
    title: 'name',
    dataIndex: 'name',
  },
  {
    title: 'description',
    dataIndex: 'description',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];
</script>

<template>
  <div class="Location">
    <a-table :columns="columns" :dataSource="products" bordered :pagination="{ pageSize: 7 }">
      <template #headerCell="{ column }">
        <template v-if="column.dataIndex === 'action'">
          <div class="header-action">
            <span>{{ column.title }}</span>
            <a-button type="primary" @click="addmodal(true)">
              Add brand
            </a-button>
          </div>
        </template>
        <template v-else>
          <span>{{ column.title }}</span>
        </template>
      </template>




      <template #bodyCell="{ column, record,index}">
        <template  v-if="column.dataIndex === '№'">
          <span>{{index + 1 }}</span> 
        </template>
        
        <template v-else-if="column.dataIndex === 'name'">
          <span>{{ record.name }}</span>
        </template>
        <template v-else-if="column.dataIndex === 'description'">
          <span>{{ record.description }}</span>
        </template>
        <template v-else-if="column.dataIndex === 'action'">
          <div class="action-buttons">
            <a-button type="primary" @click="editProduct(record)">
              Edit
            </a-button>
            <a-button type="primary" danger style="margin-left: 15px;" @click="tovarid(record.id)">
              Delete
            </a-button>
          </div>
        </template>
      </template>
    </a-table>
  </div>

  <!-- Modal ADD -->
  <a-modal v-model:open="modaladd" title="Add new Category" @ok="addProduct">
    <a-form id="myFormCategory" layout="vertical" style="margin-top: 20px;">
      <a-form-item label="Name" :rules="[{ required: true }]">
        <a-input v-model:value="name" placeholder="Enter name..." />
      </a-form-item>

      <a-form-item label="Description" :rules="[{ required: true }]">
        <a-input v-model:value="description" placeholder="Enter description..." />
      </a-form-item>
    </a-form>
  </a-modal>

  <!-- Modal EDIT-->
  <a-modal v-model:open="modaledit" title="Edit Category" @ok="editChangeProduct">

<a-form layout="vertical" style="margin-top: 20px;">

<a-form-item
   label="Name"
  :rules="[{ required: true}]"
> 
<a-input type="text"  v-model:value="inputname" placeholder="name....." />
</a-form-item>


<a-form-item
   label="Text"
  :rules="[{ required: true}]"
> 
<a-input type="text"  v-model:value="inputdescription" placeholder="text....." />
</a-form-item>

</a-form>
</a-modal>

  <!-- Modal Delete-->
  <a-modal v-model:open="modaldelete" title="Delete Category" @ok="deleteProduct">
    <h3 style="font-size: 22px;">Are you sure you want to delete </h3>
   </a-modal>




</template>

<style lang="scss" scoped>


</style>
