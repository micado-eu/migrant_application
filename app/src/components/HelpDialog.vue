<template>
 <q-dialog v-model="open" @hide="reset()">
   <q-layout view="Lhh lpR fff" container class="bg-white">
          <q-header class="bg-white">
            <q-toolbar>
              <q-toolbar-title></q-toolbar-title>
              <q-btn
                flat
                color="black"
                v-close-popup
                round
                dense
                icon="close"
              />
            </q-toolbar>
          </q-header>
      <q-page-container>
            <q-page padding>

        <q-card-section v-if="content_type == 'menu'" style="text-align:center">
           <q-icon :name="icon" class="top-icon"/>
        </q-card-section>
        <q-card-section v-else style="text-align:center">
           <q-img
            :src="icon"
            class="top-icon"
          />
        </q-card-section>
        <q-card-section>
          <TalkingLabel
          :row="'row'"
          :title_col="'col-11 '"
          :showing="'flex-grow:1;font-family: Nunito;font-style: normal;font-weight: bold;font-size: 16px;line-height: 16px;color: #0F3A5D;;padding-top:3px'"
         :container_style="'display: flex;'"
          :icon_style="'flex-shrink:0;text-align:right;padding-top:3px'"
          :Title="title"
          :text="title"
        />
        </q-card-section>
        <q-card-section v-if="content != null && content.length >0">
      <glossary-editor-viewer
        :content="content"
        talkingLabelLocation="right"
        class="description"
      />
        <!--  <TalkingLabel
          :row="'row'"
          :title_col="'col-11 '"
          :showing="'flex-grow:1;font-family: Nunito;font-style: normal;font-weight: normal;font-size: 14px;line-height: 16px;color: #000000;;padding-top:3px'"
        :container_style="'display: flex;'"
          :icon_style="'flex-shrink:0;text-align:right;padding-top:3px'"
          :Title="content"
          :text="content"
        />-->
        </q-card-section>
      <div class="row" v-if="content_type == 'topic'" style="text-align:center; margin-bottom:20px; margin-top:25px;  justify-content: center;">
         <q-btn
         @click="navigate"
          :label="$t('button.continue')"
          class="continue"
          :icon="'img:statics/icons/Icon - read more.svg'"
          no-caps
        />
        <TalkingLabel
                  :text="$t('button.continue')"
                  :icon_style="'margin-top:7px; margin-left:10px'"                  
                />
  </div>
          </q-page>
          </q-page-container>
        </q-layout>    
        </q-dialog>
</template>

<script>
const TalkingLabel = () => import('components/TalkingLabel')
import GlossaryEditorViewer from "components/GlossaryEditorViewer"

export default {
  // name: 'ComponentName',
  props: ['id','open', 'title', 'content', 'icon', 'content_type'],
  data () {
    return {}
  },
    components:{
    TalkingLabel,GlossaryEditorViewer
  },
  methods:{
    reset(){
      this.$emit("hiding")
    },
    navigate(){
      this.$emit("navigation", this.id)
    }
  }
}
</script>
<style scoped>
.top-icon{
  width:100%;
  height:100%
}
.continue{
  width: 250px;
  color: white;
  background: #0F3A5D;
  border-radius: 50px;
}
</style>
