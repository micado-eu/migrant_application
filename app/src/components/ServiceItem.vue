<template>
  <div class="card" :class="this.theService.icon">
    <div class="card-body">
      <h5 class="card-title">{{ this.theService.title }}</h5>
      <p class="card-text">{{ this.theService.text }}</p>
      <a :href="this.theService.link" class="btn btn-primary">{{ this.theService.button }}</a>
    </div>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: ['theService'],
  data () {
    return {}
  }
}
</script>
