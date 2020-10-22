<template>
<q-card class="comments">
     <h5 class="header"> {{ $t('desc_labels.comments') }} </h5>
      <div
      v-for="comment in selected_process_comments"
      :key="comment.id"
      >
      {{comment.translations.filter(filterTranslationModel(activeLanguage))[0].comment}}<br>
      <TalkingLabel
                  :Title="comment.tenant.name"
                  :text="comment.translations.filter(filterTranslationModel(activeLanguage))[0].comment"
                >
      </TalkingLabel>
      
      </div>
    </q-card>
</template>

<script>
import editEntityMixin from '../mixin/editEntityMixin'
import TalkingLabel from 'components/TalkingLabel'


export default {
  // name: 'ComponentName',
  props: ['selected_process_comments'],
  mixins:[editEntityMixin],
  components:{
    TalkingLabel
  },
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