<template>
  <q-expansion-item
    :label="this.Title"
    header-class="bg-white text-accent"
    expand-icon-class="text-white"
    style=" border-width:3px; border-color:#0f3a5d; border-radius: 1.95rem;border-style: solid; margin-bottom: 1px"
  >
    <q-separator/>
    <q-item style="border-radius: 2.00rem;">
      <q-item-section class="col-10" style="max-width:100%">{{ this.Text }}</q-item-section>
      <q-item-section class="col-2" style="max-width:30%">
        <img style="max-width:150px" :src="this.Image">
      </q-item-section>
    </q-item>
    <q-item>
      <div class="row" style="width:100%">
        <div class="col-0.5" style="padding:6px">Topics:</div>
        <div class="col">
          <q-chip v-for="tag in Tag_1" :label="tag" :key="tag"></q-chip>
        </div>
      </div>
      <div class="row" style="width:100%">
        <div class="col-0.5" style="padding:6px">Users:</div>
        <div class="col">
          <q-chip v-for="tag in Tag_2" :label="tag" :key="tag"></q-chip>
        </div>
      </div>
      <br>
    </q-item>
    <div class="q-pa-md">
      <q-btn color="info" label="Go to process" to="/placeholder"/>
    </div>
  </q-expansion-item>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: ["Title", "Text", "Image", "Tag_1", "Tag_2", "Bool", "Link"],
  data() {
    return {};
  }
};
</script>
<style scoped>
div >>> .q-item {
  border-radius: 2rem;

  &:hover {
    color: blue;
  }
}
</style>