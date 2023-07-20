<script setup>
import ColorDisplay from './ColorDisplay.vue'

const props = defineProps({
  name: String,
  selected: {
    type: Boolean,
    default: false
  },
  count: {
    type: Number,
    default: 0
  },
  color: {
    type: String,
    default: '#000000'
  }
})

const emit = defineEmits(['update:selected', 'update:count', 'update:color'])
</script>

<template>
  <div class="ListItem" @click="() => emit('update:selected', !props.selected)">
    <i class="far" :class="props.selected ? 'fa-square-check' : 'fa-square'"></i>

    <label class="Label">{{ props.name }}</label>

    <input
      class="CountInput"
      type="number"
      min="0"
      step="1"
      :value="props.count"
      @click.stop
      @input="(e) => emit('update:count', +e.currentTarget.value)"
    />

    <ColorDisplay
      :value="props.color"
      @update:value="(value) => emit('update:color', value)"
      editable
    />
  </div>
</template>

<style scoped>
.ListItem {
  display: flex;
  align-items: center;
  gap: 8px;
}

.Label {
  user-select: none;

  flex-grow: 1;
}

.CountInput {
  flex-shrink: 1;
  width: 10%;
}
</style>
