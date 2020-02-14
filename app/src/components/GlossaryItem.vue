<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-expansion-item
        group="glossary"
        expand-separator
        icon="book"
        :label="this.theGlossary.title"
        >
        <q-card>
          <q-card-section>
            {{this.theGlossary.text}}
          </q-card-section>
          <q-card-section>
            Tags: {{this.theGlossary.tags.join(', ')}}
            </q-card-section>
        </q-card>
      </q-expansion-item>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: ['theGlossary'],
  data () {
    return {}
  }
}
</script>
