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
          <TalkingLabel
          :row="'row'"
          :title_col="'col-11 '"
          :showing="'flex-grow:1;font-family: Nunito;font-style: normal;font-weight: normal;font-size: 14px;line-height: 16px;color: #000000;;padding-top:3px'"
        :container_style="'display: flex;'"
          :icon_style="'flex-shrink:0;text-align:right;padding-top:3px'"
          :Title="content"
          :text="content"
        />
        </q-card-section>
          </q-page>
          </q-page-container>
        </q-layout>    
        </q-dialog>
</template>

<script>
const TalkingLabel = () => import('components/TalkingLabel')

export default {
  // name: 'ComponentName',
  props: ['open', 'title', 'content', 'icon', 'content_type'],
  data () {
    return {}
  },
    components:{
    TalkingLabel
  },
  methods:{
    reset(){
      this.$emit("hiding")
    }
  }
}
</script>
<style scoped>
.top-icon{
  width:100%;
  height:100%
}
</style>
