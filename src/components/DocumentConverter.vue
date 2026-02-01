


<template>
  <div class="card">
    <h1>Document Converter</h1>
    <p class="subtitle">Upload a file and convert it instantly</p>

    <label class="dropzone">
      <input type="file" hidden @change="handleFile" />
      <span v-if="!file">Click to upload or drag & drop</span>
      <span v-else class="filename">{{ file.name }}</span>
    </label>

    <select v-model="format">
      <option value="pdf">Convert to PDF</option>
      <option value="docx">Convert to DOCX</option>
      <option value="txt">Convert to TXT</option>
    </select>

    <button @click="convert" :disabled="loading">
      <span v-if="!loading">Convert</span>
      <span v-else class="loader"></span>
    </button>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { convertDocument } from "../services/api.js"
import { isValidFile } from "../utils/validators.js"

const file = ref(null)
const format = ref("pdf")
const loading = ref(false)
const error = ref("")

const handleFile = (e) => {
  const selected = e.target.files[0]
  if (!isValidFile(selected)) {
    error.value = "Invalid file or file too large (max 10MB)"
    return
  }
  error.value = ""
  file.value = selected
}

const convert = async () => {
  if (!file.value) {
    error.value = "Please select a file first"
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
    error.value = "Conversion failed. Try again."
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.card {
  background: var(--card-bg);
  width: 100%;
  max-width: 380px;
  padding: 28px;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  animation: fadeIn 0.4s ease;
}

h1 {
  margin: 0;
  font-size: 1.4rem;
  text-align: center;
}

.subtitle {
  text-align: center;
  color: var(--muted);
  font-size: 0.9rem;
  margin: 8px 0 20px;
}

.dropzone {
  border: 2px dashed #c7d2fe;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 16px;
  transition: border-color 0.2s, background 0.2s;
}

.dropzone:hover {
  border-color: var(--primary);
  background: #eef2ff;
}

.filename {
  font-weight: 500;
  word-break: break-word;
}

select {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #cbd5f5;
  margin-bottom: 16px;
  font-size: 0.95rem;
}

button {
  width: 100%;
  padding: 12px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
}

button:hover {
  background: var(--primary-hover);
}

button:active {
  transform: scale(0.98);
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error {
  color: var(--error);
  text-align: center;
  margin-top: 12px;
  font-size: 0.9rem;
}

.loader {
  width: 18px;
  height: 18px;
  border: 3px solid white;
  border-top: 3px solid transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>


