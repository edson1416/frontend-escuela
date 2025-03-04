<template>
  <div class="pdf-thumbnail" @click="openPdfInNewTab">
    <canvas ref="pdfCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as pdfjsLib from 'pdfjs-dist';


// Props
const props = defineProps({
  pdfUrl: {
    type: String,
    required: true,
  },
});

// Refs
const pdfCanvas = ref(null);
const pdfDoc = ref(null);
const pageNum = ref(1);
const scale = ref(0.5); // Escala para la miniatura

// Configura el worker de PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

// Cargar el PDF
const loadPdf = async () => {
  try {
    pdfDoc.value = await pdfjsLib.getDocument(props.pdfUrl).promise;
    renderPage(pageNum.value);
  } catch (error) {
    console.error('Error loading PDF:', error);
  }
};

// Renderizar la página del PDF en el canvas
const renderPage = async (pageNum) => {
  const page = await pdfDoc.value.getPage(pageNum);
  const viewport = page.getViewport({ scale: scale.value });
  const canvas = pdfCanvas.value;
  const context = canvas.getContext('2d');

  canvas.height = viewport.height;
  canvas.width = viewport.width;

  const renderContext = {
    canvasContext: context,
    viewport: viewport,
  };

  await page.render(renderContext).promise;
};

// Abrir el PDF en una nueva pestaña
const openPdfInNewTab = () => {
  window.open(props.pdfUrl, '_blank');
};

// Cargar el PDF cuando el componente se monta
onMounted(() => {
  loadPdf();
});
</script>

<style scoped>
.pdf-thumbnail {
  cursor: pointer;
  border: 1px solid #ccc;
  display: inline-block;
}
</style>