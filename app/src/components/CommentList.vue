<template>
<div class=" row">
  <div class="col-4 comment-title">
    {{$t('desc_labels.comments')}}:
  </div>
  <div class="col-8">
      <div
      v-for="comment in selected_process_comments"
      :key="comment.id"
      >
      {{comment.translations.filter(filterTranslationModel(activeLanguage))[0].comment}}<br>
      <TalkingLabel
                  :Title="comment.tenant.name"
                  :text="comment.translations.filter(filterTranslationModel(activeLanguage))[0].comment + ' by' + comment.tenant.name"
                >
      </TalkingLabel>
      
      </div>
  </div>
    </div>
</template>

<script>
import editEntityMixin from '../mixin/editEntityMixin'
const TalkingLabel = () => import('components/TalkingLabel')


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
.comment-title{
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: #000000;
}
</style>