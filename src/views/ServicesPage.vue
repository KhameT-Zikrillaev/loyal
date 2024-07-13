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
    const response = await axiosCustom.get("services/");
    products.value = response.data?.data;
  } catch (error) {
    console.error('Error fetching news:', error);
  }
}
fletchcard();
//~~~~~~~~~~~IDTOVAR~~~//
const idtovar = ref("")

//~~~~~~~~~~~~~~~~~~~~~ ADD Product~~~~~~~~~~~~~~~~~~~~~~~~~
const title_en = ref("");
const title_ru = ref("");
const title_uz = ref("");
const title_tr =ref("");
const title_zh = ref("");
const text_en = ref("")
const text_ru = ref("");
const text_uz= ref("");
const text_tr =ref("");
const text_zh =ref("");
const imagerasm = ref("");
function imagePicture(item) {
  imagerasm.value = item;
}

const addProduct = async () => {
  const formData = new FormData();
  formData.append("title_en", title_en.value);
  formData.append("text_en", text_en.value);
  formData.append("title_ru", title_ru.value);
  formData.append("text_ru", text_ru.value);
  formData.append("title_uz", title_uz.value);
  formData.append("text_uz", text_uz.value);
  formData.append("title_tr", title_tr.value);
  formData.append("text_tr", text_tr.value);
  formData.append("title_zh", text_zh.value);
  formData.append("text_zh", title_zh.value);
  formData.append("images", imagerasm.value);
  try {
    await axiosCustom.post(`services/`, formData);
    toast.success("Added new Services successfully", {
      autoClose: 2000,
      theme: "colored"
    });
    document.getElementById("myFormServices").reset();
    addmodal(false);
    fletchcard();
  } catch (error) {
    toast.error(`Error: ${error}`, {
      autoClose: 2000,
      theme: "colored"
    });
    console.error('Error adding news:', error);
  }
}


//~~~~~~~~~~~~~~~~~~~~~ EDIT Product~~~~~~~~~~~~~~~~~~~~~~~~~

const inputtitle_en = ref("");
const inputtitle_ru = ref("");
const inputtitle_uz = ref("");
const inputtitle_tr =ref("");
const inputtitle_zh = ref("");
const inputtext_en = ref("")
const inputtext_ru = ref("");
const inputtext_uz= ref("");
const inputtext_tr =ref("")
const inputtext_zh =ref("")
const inputimages = ref("")
function EditPictures(item){
  inputimages.value = item
}
const data = ref(
  { 
    title_en:"",
    text_en:"",
    title_ru:"",
    text_ru:"",
    title_uz:"",
    text_uz:"",
    title_tr:"",
    text_tr:"",
    title_zh:"",
    text_zh:"",
    images:null
  }
);

const editProduct =(item) =>{
  editmodal(true)
  idtovar.value = item.id,
  inputtitle_en.value = item.title_en,
  inputtext_en.value = item.text_en,
  inputtitle_ru.value = item.title_ru,
  inputtext_ru.value = item.text_ru,
  inputtitle_uz.value = item.title_uz,
  inputtext_uz.value = item.text_uz,
  inputtitle_tr.value = item.title_tr,
  inputtext_tr.value = item.text_tr,
  inputtitle_zh.value = item.title_zh,
  inputtext_zh.value = item.text_zh,
  onChange()
  data.value.images = item.image_src
}

function onChange(){
   data.value.title_en = inputtitle_en.value,
   data.value.text_en = inputtext_en.value,
   data.value.title_ru = inputtitle_ru.value,
   data.value.text_ru = inputtext_ru.value,
   data.value.title_uz = inputtitle_uz.value,
   data.value.text_uz = inputtext_uz.value,
   data.value.title_tr = inputtitle_tr.value,
   data.value.text_tr = inputtext_tr.value,
   data.value.title_zh = inputtitle_zh.value,
   data.value.text_zh = inputtext_zh.value,
   data.value.images = inputimages.value
}

const editChangeProduct = async ()=>{

  const formData = new FormData();
  formData.append("title_en", data.value.title_en);
  formData.append("text_en", data.value.text_en);
  formData.append("title_ru", data.value.title_ru);
  formData.append("text_ru", data.value.text_ru);
  formData.append("title_uz", data.value.title_uz);
  formData.append("text_uz", data.value.text_uz);
  formData.append("title_tr", data.value.title_tr);
  formData.append("text_tr", data.value.text_tr);
  formData.append("title_zh", data.value.title_zh);
  formData.append("text_zh", data.value.text_zh);
  if(inputimages.value){
  formData.append('images', inputimages.value)
 }


  try {
    await axiosCustom.put(`services/${idtovar.value}`,formData, {
    });
    toast.success("Services is edited successfully", {
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
    await axiosCustom.delete(`services/${idtovar.value}`)
    toast.success("Services is deleted successfully", {
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











// ~~~~~~~~~~~~~~~~table views~~~~~~~~~~~~~~~~
const columns = [
  {
    title:'№',
    dataIndex: '№',
  },
  {
    title: 'title_en / text_en',
    dataIndex: 'title_en / text_en',
  },
  {
    title: 'title_ru / text_ru',
    dataIndex: 'title_ru / text_ru',
  },
  {
    title: 'title_uz / text_uz',
    dataIndex: 'title_uz / text_uz',
  },
  {
    title: 'title_tr / text_tr',
    dataIndex: 'title_tr / text_tr',
  },
  {
    title: 'title_zh / text_zh',
    dataIndex: 'title_zh / text_zh',
  },
  {
    title:'images',
    dataIndex:'images',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];
</script>

<template>

  <div class="Services">
    <h1>Services</h1>
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
        <template v-if="column.dataIndex === '№'">
          <span>{{ index +1 }}</span>
        </template>
        
        <template v-else-if="column.dataIndex === 'title_en / text_en'">
          <div class="flexs">
            <span>{{ record.title_en }}</span>
            <span>{{ record.text_en }}</span>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'title_ru / text_ru'">
          <div class="flexs">
            <span>{{ record.title_ru }}</span>
            <span>{{ record.text_ru }}</span>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'title_uz / text_uz'">
          <div class="flexs">
            <span>{{ record.title_uz }}</span>
            <span>{{ record.text_uz }}</span>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'title_tr / text_tr'">
          <div class="flexs">
            <span>{{ record.title_tr }}</span>
            <span>{{ record.text_tr }}</span>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'title_zh / text_zh'">
          <div class="flexs">
            <span>{{ record.title_zh }}</span>
            <span>{{ record.text_zh }}</span>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'images'">
          <img 
          class="imagesWidth"
               :src="'https://api.dezinfeksiyatashkent.uz/api/uploads/images/' + record.image_src " 
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
  <a-modal v-model:open="modaladd" title="Add new Services" @ok="addProduct">
    <a-form id="myFormServices" layout="vertical" style="margin-top: 20px;">

      <!-- ~~~~~~~~~~~~~~~~~~~english~~~~~~~~~~~~~~~~~~~~~~~ -->
      <a-form-item label="Title english" :rules="[{ required: true }]">
        <a-input v-model:value="title_en" placeholder="Title..." />
      </a-form-item>
      <a-form-item label="Text english" :rules="[{ required: true }]">
        <a-input v-model:value="text_en" placeholder="Text..." />
      </a-form-item>
        <!-- ~~~~~~~~~~~~~~~~~~~russian~~~~~~~~~~~~~~~~~~~~~~~ -->
        <a-form-item label="Title russian" :rules="[{ required: true }]">
        <a-input v-model:value="title_ru" placeholder="Название..." />
      </a-form-item>
      <a-form-item label="Text russian" :rules="[{ required: true }]">
        <a-input v-model:value="text_ru" placeholder="Текст..." />
      </a-form-item>
        <!-- ~~~~~~~~~~~~~~~~~~~uzbek~~~~~~~~~~~~~~~~~~~~~~~ -->
        <a-form-item label="Title uzbek" :rules="[{ required: true }]">
        <a-input v-model:value="title_uz" placeholder="Sarlavha..." />
      </a-form-item>
      <a-form-item label="Text uzbek" :rules="[{ required: true }]">
        <a-input v-model:value="text_uz" placeholder="Matn..." />
      </a-form-item>
       <!-- ~~~~~~~~~~~~~~~~~~~China~~~~~~~~~~~~~~~~~~~~~~~ -->
       <a-form-item label="Title China" :rules="[{ required: true }]">
        <a-input v-model:value="title_zh" placeholder="标题..." />
      </a-form-item>
      <a-form-item label="Text China" :rules="[{ required: true }]">
        <a-input v-model:value="text_zh" placeholder="文本..." />
      </a-form-item>
      <!-- ~~~~~~~~~~~~~~~~~~~China~~~~~~~~~~~~~~~~~~~~~~~ -->
      <a-form-item label="Title Turkey" :rules="[{ required: true }]">
        <a-input v-model:value="title_tr" placeholder="Başlık..." />
      </a-form-item>
      <a-form-item label="Text turkey" :rules="[{ required: true }]">
        <a-input v-model:value="text_tr" placeholder="Metin..." />
      </a-form-item>
      <!-- ~~~~~~~~~~~~~~~~~~~~~~~Images~~~~~~~~~~~~~~~~~~~~~~~~ -->
      <a-form-item
       label="Upload News images"
      :rules="[{ required: true}]"
    > 
    <a-input 
    type="file"
    class="inputimg"
     @input="imagePicture($event.target.files[0])" 
     accept="image/*"
     />
    </a-form-item>

    </a-form>
  </a-modal>

  <!-- Modal EDIT-->
  <a-modal v-model:open="modaledit" title="Edit Services" @ok="editChangeProduct">

<a-form layout="vertical" style="margin-top: 20px;">
     <!-- ~~~~~~~~~~~~~~~~~~~english~~~~~~~~~~~~~~~~~~~~~~~ -->
     <a-form-item label="Title english" :rules="[{ required: true }]">
        <a-input v-model:value="inputtitle_en" placeholder="Title..." />
      </a-form-item>
      <a-form-item label="Text english" :rules="[{ required: true }]">
        <a-input v-model:value="inputtext_en" placeholder="Text..." />
      </a-form-item>
        <!-- ~~~~~~~~~~~~~~~~~~~russian~~~~~~~~~~~~~~~~~~~~~~~ -->
        <a-form-item label="Title russian" :rules="[{ required: true }]">
        <a-input v-model:value="inputtitle_ru" placeholder="Название..." />
      </a-form-item>
      <a-form-item label="Text russian" :rules="[{ required: true }]">
        <a-input v-model:value="inputtext_ru" placeholder="Текст..." />
      </a-form-item>
        <!-- ~~~~~~~~~~~~~~~~~~~uzbek~~~~~~~~~~~~~~~~~~~~~~~ -->
        <a-form-item label="Title uzbek" :rules="[{ required: true }]">
        <a-input v-model:value="inputtitle_uz" placeholder="Sarlavha..." />
      </a-form-item>
      <a-form-item label="Text uzbek" :rules="[{ required: true }]">
        <a-input v-model:value="inputtext_uz" placeholder="Matn..." />
      </a-form-item>
       <!-- ~~~~~~~~~~~~~~~~~~~China~~~~~~~~~~~~~~~~~~~~~~~ -->
       <a-form-item label="Title China" :rules="[{ required: true }]">
        <a-input v-model:value="inputtitle_zh" placeholder="标题..." />
      </a-form-item>
      <a-form-item label="Text China" :rules="[{ required: true }]">
        <a-input v-model:value="inputtext_zh" placeholder="文本..." />
      </a-form-item>
      <!-- ~~~~~~~~~~~~~~~~~~~Turkey~~~~~~~~~~~~~~~~~~~~~~~ -->
      <a-form-item label="Title Turkey" :rules="[{ required: true }]">
        <a-input v-model:value="inputtitle_tr" placeholder="Başlık..." />
      </a-form-item>
      <a-form-item label="Text turkey" :rules="[{ required: true }]">
        <a-input v-model:value="inputtext_tr" placeholder="Metin..." />
      </a-form-item>
      <!-- ~~~~~~~~~~~~~~~~~~~~~~~Images~~~~~~~~~~~~~~~~~~~~~~~~ -->
      <a-form-item
       label="Upload News images"
      :rules="[{ required: true}]"
    > 
    <img class="imgedit"  :src="
                    'https://api.dezinfeksiyatashkent.uz/api/uploads/images/' +
                    data.images
                  " alt="">
    <a-input 
    type="file"
    class="inputimg"
     @input="EditPictures($event.target.files[0])" 
     accept="image/*"
     />
    </a-form-item>


</a-form>
  </a-modal>

  <!-- Modal Delete-->
  <a-modal v-model:open="modaldelete" title="Delete Services" @ok="deleteProduct">
    <h3 style="font-size: 22px;">Are you sure you want to delete </h3>
   </a-modal>




</template>

<style lang="scss" scoped>

</style>
