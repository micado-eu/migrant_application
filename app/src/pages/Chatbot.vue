<template>
  <div class="q-pa-md row justify-center">
    <div style="width: 100%; max-width: 400px">
      <q-chat-message  v-for="message in messages" :key="message.id" :text="[message.text]"
        :name="message.user"
        :stamp="message.timestamp"
        bg-color="message.color"
        text-color="black"
        :sent="message.sent"
      />
    </div>
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">Hi I'm your helping chatbot ... ask me something</label>
        <input class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter question" v-model="word" >
        <small id="emailHelp" class="form-text text-muted">I'll try to answer to my best knowledge</small>
      </div>
      <button type="submit" @click="getWord" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import ChatService from '../services/ChatService'

export default {
  name: 'Chatbot',
  props: {
    msg: String
  },
  data () {
      return {
          word: 'test',
          wordData: '',
          n_messages: 2
      }
  },
  created () {
//    this.loading = true
    console.log(this.$store);
    this.$store.dispatch('chatbot/fetchMessages')
      .then(messages => {
        this.loading = false
      })
  },
  computed: {
    messages() {
      return this.$store.state.chatbot.messages
    }
  },
  methods: {
      async getWord () {
        console.log("before calling")
        this.n_messages++
        this.$store.commit('chatbot/addMessage',{"id":this.n_messages, "user":"Luca", "text":this.word, "timestamp":"13:55", "sent":true, "color": "#cccccc"})
        const response = await ChatService.getWord({ word: this.word })
        let responses = response.data
        console.log("after calling")
        console.log(response)
        console.log(responses)
        this.wordData = responses[0]
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes()
        this.n_messages++

        this.$store.commit('chatbot/addMessage',{"id":this.n_messages, "user":"Micado", "text":responses[0].text, "timestamp":time, "sent":false, "color": "#cccccc"})
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
