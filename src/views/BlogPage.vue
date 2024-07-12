<script setup>
import { ref } from 'vue'
import axiosCustom from '@/axiosConf' // Подставьте путь к вашему axios-конфигурации
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

// ~~~~~~~~~~~~~~~~~~~~~~~~~~open closed Modals(add edit delete)~~~~~~~~~~~~~~~~~~
const modaladd = ref(false)
function addmodal(item) {
  modaladd.value = item
}
const modaledit = ref(false)
function editmodal(item) {
  modaledit.value = item
}
const modaldelete = ref(false)
function deletemodal(item) {
  modaldelete.value = item
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~fetch products view~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const products = ref([])
async function fletchcard() {
  try {
    const response = await axiosCustom.get('blogs/')
    products.value = response.data?.data
    console.log(response?.data?.data)
  } catch (error) {
    console.error('Error fetching blogs:', error)
  }
}
fletchcard()
//~~~~~~~~~~~IDTOVAR~~~//
const idtovar = ref('')

//~~~~~~~~~~~~~~~~~~~~~ ADD Product~~~~~~~~~~~~~~~~~~~~~~~~~
const title_en = ref('')
const title_ru = ref('')
const title_uz = ref('')
const title_tr = ref('')
const title_zh = ref('')
const text_en = ref('')
const text_ru = ref('')
const text_uz = ref('')
const text_tr = ref('')
const text_zh = ref('')
const author = ref('')
const imagerasm = ref('')
function imagePicture(item) {
  imagerasm.value = item
}

const addProduct = async () => {
  const formData = new FormData()
  formData.append('title_en', title_en.value)
  formData.append('text_en', text_en.value)
  formData.append('title_ru', title_ru.value)
  formData.append('text_ru', text_ru.value)
  formData.append('title_uz', title_uz.value)
  formData.append('text_uz', text_uz.value)
  formData.append('title_tr', title_tr.value)
  formData.append('text_tr', text_tr.value)
  formData.append('title_zh', text_zh.value)
  formData.append('text_zh', title_zh.value)
  formData.append('author', author.value)
  formData.append('images', imagerasm.value)
  try {
    await axiosCustom.post(`blogs/`, formData)
    toast.success('Added new blogs successfully', {
      autoClose: 2000,
      theme: 'colored',
    })
    document.getElementById('myFormBlog').reset()
    addmodal(false)
    fletchcard()
  } catch (error) {
    toast.error(`Error: ${error}`, {
      autoClose: 2000,
      theme: 'colored',
    })
    console.error('Error adding news:', error)
  }
}

//~~~~~~~~~~~~~~~~~~~~~ EDIT Product~~~~~~~~~~~~~~~~~~~~~~~~~

const inputname = ref('')
const inputdescription = ref('')

const data = ref({
  name: '',
  description: '',
})

const editProduct = (item) => {
  editmodal(true)
  ;(idtovar.value = item.id),
    (inputname.value = item.name),
    (inputdescription.value = item.description),
    onChange()
}

function onChange() {
  ;(data.value.name = inputname.value),
    (data.value.description = inputdescription.value)
}

const editChangeProduct = async () => {
  onChange()
  const formData = new FormData()
  formData.append('name', data.value.name)
  formData.append('description', data.value.description)
  try {
    await axiosCustom.put(`blogs/${idtovar.value}`, formData, {})
    toast.success('Blog is edited successfully', {
      autoClose: 2000,
      theme: 'colored',
    })
    fletchcard()
    editmodal(false)
  } catch (error) {
    toast.error(`Error: ${error}`, {
      autoClose: 2000,
      theme: 'colored',
    })
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~DELETE Product~~~~~~~~~~~~~~~~~~~~~~~~
const tovarid = (id) => {
  deletemodal(true)
  idtovar.value = id
}
const deleteProduct = async () => {
  try {
    await axiosCustom.delete(`blogs/${idtovar.value}`)
    toast.success('Blog is deleted successfully', {
      autoClose: 2000,
      theme: 'colored',
    })
    fletchcard()
    deletemodal(false)
  } catch (error) {
    toast.error(`Error: ${error}`, {
      autoClose: 2000,
      theme: 'colored',
    })
  }
}

const columns = [
  {
    title: '№',
    dataIndex: '№',
  },
  {
    title: 'title_en',
    dataIndex: 'title_en',
  },
  {
    title: 'title_ru',
    dataIndex: 'title_ru',
  },
  {
    title: 'title_uz',
    dataIndex: 'title_uz',
  },
  {
    title: 'title_tr',
    dataIndex: 'title_tr',
  },
  {
    title: 'title_zh',
    dataIndex: 'title_zh',
  },
  {
    title: 'text_en',
    dataIndex: 'text_en',
  },
  {
    title: 'text_ru',
    dataIndex: 'text_ru',
  },
  {
    title: 'text_uz',
    dataIndex: 'text_uz',
  },
  {
    title: 'text_tr',
    dataIndex: 'text_tr',
  },
  {
    title: 'text_zh',
    dataIndex: 'text_zh',
  },
  {
    title: 'Author',
    dataIndex: 'author',
  },
  {
    title: 'Images',
    dataIndex: 'images',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
]
</script>

<template>
  <div class="Location">
    <a-table
      :columns="columns"
      :dataSource="products"
      bordered
      :pagination="{ pageSize: 7 }"
    >
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
   
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === '№'">
          <span>{{ record.id }}</span>
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
            <a-button
              type="primary"
              danger
              style="margin-left: 15px"
              @click="tovarid(record.id)"
            >
              Delete
              
            </a-button>
          </div>
        </template>
      </template>
    </a-table>
  </div>

  <!-- Modal ADD -->
  <a-modal v-model:open="modaladd" title="Add new Blog" @ok="addProduct">
    <a-form id="myFormBlog" layout="vertical" style="margin-top: 20px">
      <a-form-item label="Title En" :rules="[{ required: true }]">
        <a-input v-model:value="title_en" placeholder="Title En" />
      </a-form-item>

      <a-form-item label="Title Ru" :rules="[{ required: true }]">
        <a-input v-model:value="title_ru" placeholder="Title Ru" />
      </a-form-item>

      <a-form-item label="Title Uz" :rules="[{ required: true }]">
        <a-input v-model:value="title_uz" placeholder="Title Uz" />
      </a-form-item>

      <a-form-item label="Title Tr" :rules="[{ required: true }]">
        <a-input v-model:value="title_tr" placeholder="Title Tr" />
      </a-form-item>

      <a-form-item label="Title Zh" :rules="[{ required: true }]">
        <a-input v-model:value="title_zh" placeholder="Title Zh" />
      </a-form-item>

      <a-form-item label="Text En" :rules="[{ required: true }]">
        <a-input v-model:value="text_en" placeholder="Text En" />
      </a-form-item>

      <a-form-item label="Text Ru" :rules="[{ required: true }]">
        <a-input v-model:value="text_ru" placeholder="Text Ru" />
      </a-form-item>

      <a-form-item label="Text Uz" :rules="[{ required: true }]">
        <a-input v-model:value="text_uz" placeholder="Text Uz" />
      </a-form-item>

      <a-form-item label="Text Tr" :rules="[{ required: true }]">
        <a-input v-model:value="text_tr" placeholder="Text Tr" />
      </a-form-item>

      <a-form-item label="Text Zh" :rules="[{ required: true }]">
        <a-input v-model:value="text_zh" placeholder="Text Zh" />
      </a-form-item>

      <a-form-item label="Author" :rules="[{ required: true }]">
        <a-input v-model:value="author" placeholder="Author" />
      </a-form-item>

      <a-form-item label="Upload News images" :rules="[{ required: true }]">
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
  <a-modal
    v-model:open="modaledit"
    title="Edit Category"
    @ok="editChangeProduct"
  >
    <a-form layout="vertical" style="margin-top: 20px">
      <a-form-item label="Name" :rules="[{ required: true }]">
        <a-input
          type="text"
          v-model:value="inputname"
          placeholder="name....."
        />
      </a-form-item>

      <a-form-item label="Text" :rules="[{ required: true }]">
        <a-input
          type="text"
          v-model:value="inputdescription"
          placeholder="text....."
        />
      </a-form-item>
    </a-form>
  </a-modal>

  <!-- Modal Delete-->
  <a-modal
    v-model:open="modaldelete"
    title="Delete Category"
    @ok="deleteProduct"
  >
    <h3 style="font-size: 22px">Are you sure you want to delete</h3>
  </a-modal>
</template>

<style lang="scss" scoped></style>
