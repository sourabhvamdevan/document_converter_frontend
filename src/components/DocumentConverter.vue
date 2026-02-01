

<template>
  <div class="card">
    <h1>Document Converter</h1>
    <p class="subtitle">Upload a file and convert it instantly</p>

    <!-- Upload Button -->
    <label class="upload-btn">
      <Icon icon="mdi:cloud-upload-outline" class="icon" />
      <span v-if="!file">Upload Document</span>
      <span v-else class="filename">{{ file.name }}</span>
      <input type="file" hidden @change="handleFile" />
    </label>

    <select v-model="format">
      <option value="pdf">Convert to PDF</option>
      <option value="docx">Convert to DOCX</option>
      <option value="txt">Convert to TXT</option>
    </select>

    <button @click="convert" :disabled="loading">
      <Icon
        v-if="!loading"
        icon="mdi:swap-horizontal"
        class="btn-icon"
      />
      <span>{{ loading ? "Converting..." : "Convert" }}</span>
    </button>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { Icon } from "@iconify/vue"
import { convertDocument } from "../services/api.js"
import { isValidFile } from "../utils/validators.js"

const file = ref(null)
const format = ref("pdf")
const loading = ref(false)
const error = ref("")

const handleFile = (e) => {
  const selected = e.target.files[0]
  if (!isValidFile(selected)) {
    error.value = "Invalid file or file too large"
    return
  }
  error.value = ""
  file.value = selected
}

const convert = async () => {
  if (!file.value) {
    error.value = "Please select a file"
    return
  }

  loading.value = true
  error.value = ""

  const formData = new FormData()
  formData.append("file", file.value)
  formData.append("format", format.value)

  try {
    const res = await convertDocument(formData)
    const url = URL.createObjectURL(res.data)
    const a = document.createElement("a")
    a.href = url
    a.download = `converted.${format.value}`
    a.click()
  } catch {
    error.value = "Conversion failed"
  } finally {
    loading.value = false
  }
}
</script>



