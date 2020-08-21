<template>
  <div class="q-pa-md row justify-center">
    <div style="width: 100%; max-width: 400px">
      <q-chat-message
        v-for="message in messages"
        :key="message.id"
        :text="[message.text]"
        :name="message.user"
        :stamp="message.timestamp"
        bg-color="message.color"
        text-color="black"
        :sent="message.sent"
      >
        <q-btn
          v-if="message.btn"
          :label="message.btn_label"
          :to="message.btn_link"
        />
      </q-chat-message>
    </div>
    <!--    <form> -->
    <div class="form-group">
      <label for="exampleInputEmail1">Hi I'm your helping chatbot ... ask me something</label>
      <input
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        placeholder="Enter question"
        v-model="word"
      >
      <small
        id="emailHelp"
        class="form-text text-muted"
      >I'll try to answer to my best knowledge</small>
    </div>
    <button
      @click="getWord"
      class="btn btn-primary"
    >Submit1</button>
    <!--    </form> -->
  </div>
</template>

<script>
import ChatService from '../services/ChatService'

// TODO for generating phrases better
// https://github.com/sindrekjr/sentence-engine

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
    messages () {
      return this.$store.state.chatbot.messages
    }
  },
  methods: {
    async getWord () {
      console.log("before calling")
      this.$Countly.q.push(['add_event', {
        "key": "conversation",
        "count": 1,
        "segmentation": {
          "question": this.word
        }
      }]);
      this.n_messages++
      this.$store.commit('chatbot/addMessage', { "id": this.n_messages, "user": "Luca", "text": this.word, "timestamp": "13:55", "sent": true, "color": "#cccccc", btn: false })
      const response = await ChatService.getWord({ word: this.word })
      let responses = response.data
      console.log("after calling")
      console.log(response)
      console.log(responses)
      this.wordData = responses[0]
      let today = new Date();
      let time = today.getHours() + ":" + today.getMinutes()
      this.n_messages++
      let answer = {}
      if (responses[0].custom != null) {
        let result = JSON.parse(responses[0].custom)
        console.log(result)
        answer.id = this.n_messages
        answer.user = "Micado"
        answer.text = "press the button to go to the proper process"
        answer.timestamp = time
        answer.sent = false
        answer.btn = true
        if (answer.btn) {
          answer.btn_label = result[0].process
          answer.btn_link = "/processes/" + result[0].id
        }
      } else {
        answer.id = this.n_messages
        answer.user = "Micado"
        answer.text = responses[0].text
        answer.btn = false
      }
      console.log(answer)
      this.$store.commit('chatbot/addMessage', answer)
      //     this.$store.commit('chatbot/addMessage', { "id": this.n_messages, "user": "Micado", "text": responses[0].text, "timestamp": time, "sent": false, "color": "#cccccc", btn: true, btn_label: "test", btn_link: "/processes" })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
