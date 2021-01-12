<template>
<div>
  <q-item style="max-width:320px" :key="this.theDoc.id">
    <q-item-section class="col-4" style="padding-right:0px" avatar>
      <q-btn
        size="10px"
        dense
        @click.native="showDoc()"
        :key="theDoc.id"
        :id="theDoc.id"
        :disabled="!this.isInWallet"
        :class="[{in_wallet: this.isInWallet},{not_in_wallet: !this.isInWallet}]"
      >
        <q-avatar rounded>
          <img :src="this.theDoc.image">
        </q-avatar>
      </q-btn>
    </q-item-section>
    <q-item-section class="col-8">
      <q-item-label>{{this.theDoc.text}}</q-item-label>
      <q-item-label caption>Emitted by:{{this.theDoc.emitter}}</q-item-label>
      <q-item-label caption>cost: {{this.theDoc.price}}</q-item-label>

    </q-item-section>
   
  </q-item>
   <div style="text-align:center; padding-bottom:5px">
      <q-btn
        size="12px"
        no-caps
        dense
        class="button"
        rounded
        :id="theDoc.id"
        :data-cy="'viewmodel'.concat(theDoc.id)"
        color="info"
        :label="$t('button.view_model')"
        @click="show = true"
      />
    </div>
    <q-dialog
      v-model="show"
      @hide="clean()"
      @show="showPictures($event)"
    >
      <div>
        <q-carousel
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          animated
          control-color="primary"
          class="rounded-borders"
        >
          <q-carousel-slide
            class="column no-wrap flex-center"
            v-for="picture in pictures"
            :key="picture.id"
            :name="picture.id"
          >
            <q-card-section>
              <DocumentHotspot
                :picture="picture.image"
                :data="data"
              />
            </q-card-section>
          </q-carousel-slide>
        </q-carousel>
        <div
          class="row justify-center"
          style="background-color:white"
        >
          <q-btn-toggle
            glossy
            color="accent"
            v-model="slide"
            @input="transitioning($event)"
            :options="options"
          />
        </div>
      </div>
    </q-dialog>
</div>

</template>

<script>
const DocumentHotspot = () => import('./DocumentHotspot')

//
export default {
  // name: 'ComponentName',
  props: ['theDoc', 'pictures', 'isInWallet', 'options', "data"],
  components: {
    DocumentHotspot
  },
  data () {
    return {
      show: false,
      slide: null
    }
  },
  computed: {
  },
  methods: {
    transitioning (event) {
      console.log(event)
      this.$emit('transition', { pic_id: event, doc_id: this.theDoc.id })
    },
    generateForm () {
      this.$router.push({ name: "certificates", params: { certificateId: '123' } });
    },
    showPictures (event) {
      console.log("showing")
      this.slide = this.theDoc.pictures[0].id
      this.$emit('showpicture')
    },
    showDoc () {
      console.log("showing doc")
      this.$emit('showdoc')
    },
    clean () {
      this.$emit('clean')
    }
  }
}

</script>
<style scoped>
.button{
  width:125px
  }
.image {
  max-width: 80%;
  max-height: 80%;
}
.in_wallet {
  filter: invert(48%) sepia(90%) saturate(3207%) hue-rotate(100deg)
    brightness(95%) contrast(100%);
}
.not_in_wallet {
  pointer-events: none;
}
</style>