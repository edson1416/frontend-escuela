<script setup>
import {
  FwbA,
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow,
} from 'flowbite-vue'
const currentPage = ref(1)

import { FwbPagination } from 'flowbite-vue'
import {ref} from "vue";
</script>

<template>
  <div class="flex flex-row">
    <div class="bg-red-200 w-1/6">


    </div>
    <div class="flex flex-col items-center space-y-9 w-4/6 mt-3 p-10 ">
      <div class=" flex bg-gray-100 w-2/4 justify-center rounded-md shadow-xl">
        <h1 class="text-3xl font-bold ">Grados academicos</h1>
      </div>
      <fwb-table class="w-full">
        <fwb-table-head>
          <fwb-table-head-cell>Product name</fwb-table-head-cell>
          <fwb-table-head-cell>Color</fwb-table-head-cell>
          <fwb-table-head-cell>Category</fwb-table-head-cell>
          <fwb-table-head-cell>Price</fwb-table-head-cell>
          <fwb-table-head-cell>
            <span class="sr-only">Edit</span>
          </fwb-table-head-cell>
        </fwb-table-head>
        <fwb-table-body>
          <fwb-table-row>
            <fwb-table-cell>Apple MacBook Pro 17"</fwb-table-cell>
            <fwb-table-cell>Sliver</fwb-table-cell>
            <fwb-table-cell>Laptop</fwb-table-cell>
            <fwb-table-cell>$2999</fwb-table-cell>
            <fwb-table-cell>
              <fwb-a href="#">
                Edit
              </fwb-a>
            </fwb-table-cell>
          </fwb-table-row>
          <fwb-table-row>
            <fwb-table-cell>Microsoft Surface Pro</fwb-table-cell>
            <fwb-table-cell>White</fwb-table-cell>
            <fwb-table-cell>Laptop PC</fwb-table-cell>
            <fwb-table-cell>$1999</fwb-table-cell>
            <fwb-table-cell>
              <fwb-a href="#">
                Edit
              </fwb-a>
            </fwb-table-cell>
          </fwb-table-row>
          <fwb-table-row>
            <fwb-table-cell>Magic Mouse 2</fwb-table-cell>
            <fwb-table-cell>Black</fwb-table-cell>
            <fwb-table-cell>Accessories</fwb-table-cell>
            <fwb-table-cell>$99</fwb-table-cell>
            <fwb-table-cell>
              <fwb-a href="#">
                Edit
              </fwb-a>
            </fwb-table-cell>
          </fwb-table-row>
        </fwb-table-body>

      </fwb-table>
      <fwb-pagination v-model="currentPage" :total-items="100"></fwb-pagination>
    </div>
    <div class="w-1/6"></div>
  </div>

</template>

<style scoped>

</style>