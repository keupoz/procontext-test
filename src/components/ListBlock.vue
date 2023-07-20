<script setup>
import { computed, ref } from 'vue'
import { shuffle } from '../utils/shuffle'
import ColorDisplay from './ColorDisplay.vue'

const props = defineProps({
  name: String,
  items: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:items'])

const expanded = ref(false)
const sorted = ref(false)

const items = computed(() => {
  let result = []

  for (const item of props.items) {
    if (item.selected && item.count > 0) {
      const arr = new Array(item.count).fill(item)
      result.push(arr)
    }
  }

  if (sorted.value) {
    result.sort((a, b) => a.length - b.length)
  } else {
    const arr = result.flat()

    if (arr.length > 0) {
      result = [shuffle(arr)]
    }
  }

  return result
})

function updateItem(newItem) {
  const newItems = props.items.map((item) => {
    return item.id === newItem.id ? newItem : item
  })

  emit('update:items', newItems)
}
</script>

<template>
  <div class="ListBlock">
    <div class="Heading" @click="() => (expanded = !expanded)">
      <span class="Name">{{ props.name }}</span>
      <button class="Button" @click.stop="() => (sorted = !sorted)">
        {{ sorted ? 'Перемешать' : 'Сортировать' }}
      </button>
    </div>

    <div class="Body" v-show="expanded">
      <span v-if="items.length === 0">Пустой список</span>

      <div class="Items" v-for="(arr, arrIndex) in items" :key="arrIndex">
        <ColorDisplay
          v-for="(item, itemIndex) in arr"
          :key="itemIndex"
          :value="item.color"
          @click="() => updateItem({ ...item, count: item.count - 1 })"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ListBlock {
  border: 1px solid black;
  padding: 8px;

  display: flex;
  flex-direction: column;
  gap: 8px;
}

.Heading {
  display: flex;
  align-items: center;
}

.Name {
  flex-grow: 1;
}

.Body {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.Items {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
</style>
