<script setup>
const props = defineProps({
  editable: {
    type: Boolean,
    default: false
  },
  value: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:value', 'click'])
const id = `ColorCheckbox-${lastId++}`
</script>

<script>
let lastId = 0
</script>

<template>
  <div v-if="props.editable" class="ColorDisplay">
    <input
      :id="id"
      type="color"
      class="Input"
      :value="props.value"
      @input="(e) => emit('update:value', e.currentTarget.value)"
    />

    <label class="Preview" :for="id" :style="{ backgroundColor: props.value }"></label>
  </div>

  <div v-else class="ColorDisplay" @click="() => emit('click')">
    <div class="Preview" :style="{ backgroundColor: props.value }"></div>
  </div>
</template>

<style scoped>
.ColorDisplay {
  width: 1em;
  height: 1em;

  position: relative;
}

.Input {
  width: 0;
  height: 0;

  position: absolute;
  bottom: 0;
  z-index: -1;
}

.Preview {
  display: block;

  width: 100%;
  height: 100%;
}
</style>
