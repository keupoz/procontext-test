<script setup>
import { computed, ref } from 'vue'
import ListItem from './ListItem.vue'

const props = defineProps({
  name: String,
  items: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:items'])

const expanded = ref(false)

const selectedCount = computed(() => {
  return props.items.reduce((total, item) => {
    return item.selected ? total + 1 : total
  }, 0)
})

const checkboxIcon = computed(() => {
  if (selectedCount.value > 0) {
    if (selectedCount.value === props.items.length) {
      return 'fa-square-check'
    }

    return 'fa-square-minus'
  }

  return 'fa-square'
})

function updateItem(newItem) {
  const newItems = props.items.map((item) => {
    return item.id === newItem.id ? newItem : item
  })

  emit('update:items', newItems)
}

function toggleAll() {
  const newValue = selectedCount.value !== props.items.length
  const newItems = props.items.map((item) => {
    return { ...item, selected: newValue }
  })

  emit('update:items', newItems)
}
</script>

<template>
  <div class="ListTree">
    <div class="Heading" @click="() => (expanded = !expanded)">
      <i
        class="fas fa-chevron-down"
        :class="{
          'fa-rotate-270': !expanded
        }"
      ></i>

      <i class="far" :class="checkboxIcon" @click.stop="toggleAll"></i>

      <span>{{ props.name }}</span>
    </div>

    <div class="Body" v-show="expanded">
      <ListItem
        v-for="item in props.items"
        :key="item.id"
        :name="item.name"
        :selected="item.selected"
        :count="item.count"
        :color="item.color"
        @update:selected="(value) => updateItem({ ...item, selected: value })"
        @update:count="(value) => updateItem({ ...item, count: value })"
        @update:color="(value) => updateItem({ ...item, color: value })"
      />
    </div>
  </div>
</template>

<style scoped>
.ListTree {
  display: flex;
  align-items: stretch;
  flex-direction: column;
  gap: 8px;
}

.Heading {
  user-select: none;

  display: flex;
  align-items: center;
  gap: 8px;
}

.Body {
  margin-left: calc(2em + 8px);

  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
