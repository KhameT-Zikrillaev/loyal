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
    const response = await axiosCustom.get("sources/");
    products.value = response.data?.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}
fletchcard();

const productsCategories = ref([])
async function fletchcardCategory() {
  try {
    const response = await axiosCustom.get("categories/");
    productsCategories.value = response.data?.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}
fletchcardCategory()
//~~~~~~~~~~~IDTOVAR~~~//
const idtovar = ref("")

//~~~~~~~~~~~~~~~~~~~~~ ADD Product~~~~~~~~~~~~~~~~~~~~~~~~~
const title = ref("");
const categorySelected = ref("");
const imagerasm = ref("")
function imagePicture(item) {
  imagerasm.value = item;
}


const addProduct = async () => {
  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("category", categorySelected.value);
  if(imagerasm.value){
    formData.append("images", imagerasm.value);
  }

  
  try {
    await axiosCustom.post(`sources/`, formData);
    toast.success("Added new Sources successfully", {
      autoClose: 2000,
      theme: "colored"
    });
    document.getElementById("myFormSources").reset();
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



const edittitle = ref("");
const editcategorySelected = ref("");
const editimagerasm = ref("")
function editimagePicture(item) {
  editimagerasm.value = item;
}

const data = ref(
  { 
    title:"",
    category:"",
    images:""
  }
);

const editProduct =(item) =>{
  editmodal(true)
  idtovar.value = item.id,
  edittitle.value = item.title,
  editcategorySelected.value = item.category,
  onChange()
  data.value.images = item.src
  console.log(idtovar.value)
}

function onChange(){
   data.value.title = edittitle.value,
   data.value.category = editcategorySelected.value,
   data.value.images =  editimagerasm.value
}

const editChangeProduct = async ()=>{
  const formData = new FormData();
 formData.append('title', data.value.title);
 formData.append('category', data.value.category);
 if(editimagerasm.value){
  formData.append('images', editimagerasm.value)
 }

  try {
    await axiosCustom.put(`sources/${idtovar.value}`,formData, {
    });
    toast.success("Sources is edited successfully", {
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
    await axiosCustom.delete(`sources/${idtovar.value}`)
    toast.success("Sources is deleted successfully", {
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
    title: 'title',
    dataIndex: 'title',
  },
  {
    title: 'category',
    dataIndex: 'category',
  },
  {
    title: 'images',
    dataIndex: 'images',
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




      <template #bodyCell="{ column, record, index }">
        <template  v-if="column.dataIndex === '№'">
            <span>{{ index +1 }}</span>
        </template>
        
        <template v-else-if="column.dataIndex === 'title'">
          <span>{{ record.title }}</span>
        </template>
        <template v-else-if="column.dataIndex === 'category'">
          <span>{{ record.category_name }}</span>
        </template>
        <template v-else-if="column.dataIndex === 'images'">
            <img 
             class="imagesWidth"
               :src="'https://api.dezinfeksiyatashkent.uz/api/uploads/images/' + record.src " 
               alt=""
          /> 
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
  <a-modal v-model:open="modaladd" title="Add new Sources" @ok="addProduct">
    <a-form id="myFormSources" layout="vertical" style="margin-top: 20px;">

        <!-- ~~~~~~~~~~~~~~~title~~~~~~~~~~~~~~~~~~ -->
      <a-form-item label="Title" :rules="[{ required: true }]">
        <a-input v-model:value="title" placeholder="Enter title..." />
      </a-form-item>
        <!-- ~~~~~~~~~~~~~~~~~selected category~~~~~~~~~~~~~~~ -->
      <a-form-item
      label="Category Name"
      :rules="[{ required: true}]"
    >
    <a-select
      ref="select"
      v-model:value="categorySelected"
      style="width: 100%">
    <a-select-option value="" disabled>Category brand</a-select-option>

      <a-select-option v-for="category in productsCategories" :key="category.id" :value="category.id"> {{ category.name }} </a-select-option>

    </a-select>
    </a-form-item>

 <!-- ~~~~~~~~~~~~~~~~~images~~~~~~~~~~~~~~~ -->

 <a-form-item label="Upload News images" :rules="[{ required: true }]">
        <a-input type="file" class="inputimg" @input="imagePicture($event.target.files[0])" accept="image/*" />
      </a-form-item>

    </a-form>
  </a-modal>















  <!-- Modal EDIT-->
  <a-modal v-model:open="modaledit" title="Edit Sources" @ok="editChangeProduct">

    <a-form id="myFormSources" layout="vertical" style="margin-top: 20px;">

<!-- ~~~~~~~~~~~~~~~title~~~~~~~~~~~~~~~~~~ -->
<a-form-item label="Title" :rules="[{ required: true }]">
<a-input v-model:value="edittitle" placeholder="Enter title..." />
</a-form-item>
<!-- ~~~~~~~~~~~~~~~~~selected category~~~~~~~~~~~~~~~ -->
<a-form-item
label="Category Name"
:rules="[{ required: true}]"
>
<a-select
ref="select"
v-model:value="editcategorySelected"
style="width: 100%">
<a-select-option value="" disabled>Category selected</a-select-option>

<a-select-option v-for="category in productsCategories" :key="category.id" :value="category.id"> {{ category.name }} </a-select-option>

</a-select>
</a-form-item>

<!-- ~~~~~~~~~~~~~~~~~images~~~~~~~~~~~~~~~ -->

<a-form-item label="Upload News images" :rules="[{ required: true }]">
    <img class="imgedit"  :src="
                    'https://api.dezinfeksiyatashkent.uz/api/uploads/images/' +
                    data.images
                  " alt="">
<a-input type="file" class="inputimg" @input="editimagePicture($event.target.files[0])" accept="image/*" />
</a-form-item>

</a-form>
</a-modal>













  <!-- Modal Delete-->
  <a-modal v-model:open="modaldelete" title="Delete Sources" @ok="deleteProduct">
    <h3 style="font-size: 22px;">Are you sure you want to delete </h3>
   </a-modal>




</template>

<style lang="scss" scoped>


</style>
