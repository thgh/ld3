<template>
  <input
  	:value="value"
	  @input="$emit('input', $event.target.value)"
	  placeholder="placeholder || 'needs placeholder'"
	  :id="id"
  >
</template>

<script>
export default {
  name: 'value-string',
  props: ['value', 'placeholder', 'id']
}
</script>
