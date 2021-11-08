<template>
  <div
    class="q-pa-md "
    style="padding-top:0px"
  >
    <!--<q-btn
      round
      size="xs"
      flat
      @click="chatting = true"
    >
      <q-avatar>
        <img src="~assets/Chatbot button (when activated).svg" />
      </q-avatar>
    </q-btn>-->
    <q-dialog v-model="chatting" >
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
          <q-card-section>
          <TalkingLabel
          :row="'row'"
          :title_col="'col-11 '"
          :showing="'flex-grow:1;font-family: Nunito;font-style: normal;font-weight: bold;font-size: 16px;line-height: 16px;color: #0F3A5D;;padding-top:3px'"
          :container_style="'display: flex;'"
          :icon_style="'flex-shrink:0;text-align:right;padding-top:3px'"
          :Title="$t('welcome_page.need_login_chat')"
          :text="$t('welcome_page.need_login_chat')"
        />
          </q-card-section>
        <q-card-section style="text-align:center">
           <q-icon :name="'img:statics/icons/MICADO APP - chatbot not available  1.svg'" class="top-icon"/>
        </q-card-section>
        <q-card-section style="text-align:center">      
        <q-btn
          :label="$t('welcome_page.create_account')"
          class="button"
          no-caps
          @click="registering()"
        />        </q-card-section>
          </q-page>
          </q-page-container>
        </q-layout>    
        </q-dialog>
  </div>
</template>

<script>
const TalkingLabel = () => import('components/TalkingLabel')

export default {
  // name: 'ComponentName',
  props: ['theService'],
  data () {
    return {
      chatting:false
    }
  },
  components:{
     TalkingLabel

  },
  methods:{
    registering(){
      this.$emit('registering')
    }
  }
}
</script>
<style scoped>
.top-icon{
  width:100%;
  height:100%
}
.button{
  width: 230px;
  background: #FF7C44;
  border-radius: 50px;
  color: white;
}
</style>
