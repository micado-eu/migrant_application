<template>
<q-card class="comments">
     <h5 class="header"> {{ $t('desc_labels.comments') }} </h5>
      <div
      v-for="comment in selected_process_comments"
      :key="comment.id"
      >
      {{comment.translations.filter(filterTranslationModel(activeLanguage))[0].comment}}<br>
      - Template tenant
      </div>
    </q-card>
</template>

<script>
import editEntityMixin from '../mixin/editEntityMixin'

export default {
  // name: 'ComponentName',
  props: ['selected_process_comments'],
  mixins:[editEntityMixin],
  data () {
    return {}
  },
  computed: {
    
  }
}
</script>
<style scoped>
.comments{
  margin-top:20px;
  padding-left:20px
}
.header{
  margin-bottom:10px;
}
</style>