<template>
  <div>
    <q-item
      class="item"
      clickable
      @click="viewDoc"
      :data-cy="'viewdocument'.concat(Link)"
    >
      <q-item-section class="col-2 section">
        <img
          class="image"
          :src="this.Image"
        >
      </q-item-section>
      <div class="col div-1">
        <div class="div-2">
          <q-item-section class=" section-2" style="">
              <TalkingLabel
                  :Title="this.Title"
                  :text="this.Title"
                  :row="'row'"
                  :title_col="'col-11'"
                  :icon_col="'col-1'"
                  :icon_style="'text-align:right'"
                />
          </q-item-section>
        </div>
        <div>
          <q-icon
            class="icon"
            :data-cy="'editdocument'.concat(Link)"
            name="img:statics/icons/Edit.png"
            size="md"
            @click.stop="editing"
          />
          <q-icon
            class="icon"
            :data-cy="'senddocument'.concat(Link)"
            name="img:statics/icons/Send.png"
            size="md"
            @click.stop="show = true"
          />
          <q-icon
            :id="this.Link"
            :data-cy="'deletedocument'.concat(Link)"
            name="img:statics/icons/Icon - Delete.svg"
            @click.stop="deleteDocument($event)"
            size="md"
          />
        </div>
      </div>
      <q-dialog
        @hide="clean()"
        v-model="show"
      >
        <q-card class="q-pa-md">
          <h5 class="header">{{$t('desc_labels.send_doc')}} </h5>
          <div class="row">
            <q-select
              filled
              v-model="emailTenant"
              :options="tenants"
              option-value="email"
              option-label="name"
              emit-value
              map-options
              @input="assign"
            />
          </div>
          <div class="row">
            <q-input
              dense
              standout
              outlined
              type="email"
              :label="$t('input_labels.email')"
              v-model="email"
            />
          </div>
          <q-btn
            size="12px"
            no-caps
            class="button"
            rounded
            color="info"
            :disable="!canSend"
            :label="$t('button.send')"
            @click="sendDoc()"
          />
        </q-card>
      </q-dialog>
    </q-item>
    <hr class="hr">

  </div>
</template>

<script>
import storeMappingMixin from '../mixin/storeMappingMixin'
const TalkingLabel = () => import('./TalkingLabel')

export default {
  // name: 'ComponentName',
  props: ["Title", "Image", "Link", "theDocument"],
  data () {
    return {
      show: false,
      emailTenant: "",
      email: ""
    }
  },
  components:{
    TalkingLabel
  },
  computed: {
    canSend () {
      var re = /\S+@\S+\.\S+/;
      return re.test(this.email);
    }
  },
  mixins: [
    storeMappingMixin({
      getters: {
        tenants: 'tenant/tenants'
      }
    })

  ],
  methods: {
    editing () {
      if(this.theDocument.uploadedByMe){
        console.log("prima di mandare i process")
      console.log(this.theDocument)
      this.$router.push({ name: 'editdocument', params: { thedocid: this.Link } })
      }
      else{
        this.$q.notify({
        message: 'You can\'t edit documents not uploaded by you',
        color: 'purple'
      })
      }
      
    },
    deleteDocument () {
      if(this.theDocument.uploadedByMe){
      console.log("in delete document event")
      this.$emit('delete', event.currentTarget.id)
      }
       else{
        this.$q.notify({
        message: 'You can\'t delete documents not uploaded by you',
        color: 'purple'
      })
      }
    },
    viewDoc () {
      this.$router.push({ name: 'viewdocument', params: { thedocid: this.Link } })
    },
    clean () {
      this.email = ""
    },
    sendDoc () {
      console.log(this.emailOption)
      console.log(this.emailTenant)

      this.$emit('sendDoc', { docid: this.Link, email: this.email })
      this.show = false
    },
    assign (value) {
      console.log(value)
      this.email = value
    }

  },
  created () {

  }
}
</script>
<style scoped>
#title {
  font-size: 16pt;
  font-weight: bold;
}
.header {
  margin-top: 5px;
  margin-bottom: 20px;
}
.item {
  padding-top: 0px;
  padding-right: 0px;
}
.section {
  width: 96px;
  height: 64px;
}
.image {
  width: 64px;
  height: 64px;
  margin-top: 20px;
}
.div-1 {
  height: 64px;
  padding-right:20px;
  padding-top:10px
}
.div-2 {
  height: 32px;
  vertical-align: text-top;
}
.section-2 {
  font-size: 15px;
  font-weight: 600;
}
.icon {
  margin-right: 10px;
}
.hr {
  border: 1px solid #e8e8e8;
}
.button {
  margin-top: 10px;
}
</style>