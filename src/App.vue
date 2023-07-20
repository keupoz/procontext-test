<script setup>
import { ref } from 'vue'
import ListBlock from './components/ListBlock.vue'
import ListTree from './components/ListTree.vue'
import { generateLists } from './utils/generateLists'

const lists = ref(generateLists())

function updateList(newList) {
  lists.value = lists.value.map((list) => {
    return list.id === newList.id ? newList : list
  })
}

function handleUpdateItems(list, value) {
  updateList({ ...list, items: value })
}
</script>

<template>
  <div class="App">
    <div class="AppPanel">
      <ListTree
        v-for="list in lists"
        :key="list.id"
        :name="list.name"
        :items="list.items"
        @update:items="(value) => handleUpdateItems(list, value)"
      />
    </div>

    <div class="AppPanel">
      <ListBlock
        v-for="list in lists"
        :key="list.id"
        :name="list.name"
        :items="list.items"
        @update:items="(value) => handleUpdateItems(list, value)"
      />
    </div>
  </div>
</template>

<style scoped>
.App {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.AppPanel {
  border: 1px solid black;
  padding: 8px;

  display: flex;
  flex-direction: column;
  flex-basis: 40%;
  gap: 8px;
}

@media (min-width: 900px) {
  .App {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
