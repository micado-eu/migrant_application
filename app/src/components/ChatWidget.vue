<template>
<div class="q-pa-md q-gutter-sm">
    <!--<q-btn icon="mail" style="width:40px; heigth:40px" color="red" @click="register" />-->
    <q-dialog v-model="layout">
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-bar class="bg-secondary text-white q-pr-none">
          <q-toolbar-title>Micado Chat</q-toolbar-title>
          <q-btn flat icon="cancel" @click="layout = false" ></q-btn>
        </q-bar>
           <q-card class=" q-pa-md column"  style="height: 75vh">  
            <q-scroll-area 
            :thumb-style="thumbStyle"
            :bar-style="barStyle" 
            class="col" 
            ref="chat"  >
            
            <q-chat-message
            class="q-pa-md"
            v-for="message in messages"
            :id="message.id"
            :key="message.id"
            :name="message.user"
            :text="[message.message]"
            :sent="message.user == $envconfig.bot_name"
            />
              
            </q-scroll-area>
           
            <q-card-actions class="q-pa-md">
                <div class="col-10">
            <q-input autofocus dense outlined v-on:keyup.enter="sendMessages" v-model="question" label="Outlined" />
            </div>
            <div class="col-2">
            <q-btn class="button" size="15px" style="width:100%" color="accent" unelevated no-caps  text-color="white" :label="$t('button.save')" @click="sendMessages()" />
            </div>
            </q-card-actions>
           </q-card>
      </q-layout>
    </q-dialog>
</div>
</template>

<script>
import storeMappingMixin from '../mixin/storeMappingMixin'
import axios from 'axios'

let api = null
export default {
   name: 'ChatWidget',
  props: ['picture', 'data'],
  mixins: [
    storeMappingMixin({
      getters: {
        user: 'auth/user',
      }, actions: {
        fetchSpecificUser: 'user/fetchSpecificUser',
        saveUserPic:'user/saveUserPic',
        editUserPic:'user/editUserPic',
        editUserData:'user/editUserData',
        editUserPassword:'user/editUserPassword'
      }
    })

  ],
  data () {
    return {
            thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0.75
      },

      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#027be3',
        width: '9px',
        opacity: 0.2
      },
        layout: false,
        webSocketUrl: 'wss://admin2.micadoproject.eu/websocket',
        connectedToApi: true,
        loggedIn: false,
        userId: '',
        authToken: '',
        username: '',
        password: '',
        roomName: 'sandbox',
        roomId: 'Drjw54ftqGa4antMW',
        roomConnected: false,
        connected:false,
        newMessage: '',
        messages: [],
        errors: [],
        lastSync: new Date ().getTime (),
        syncInterval: 30000,
        question:'',
        sub_id:null
      }
    },
     mounted() {
      //api = rcApi.connectToRocketChat (this.webSocketUrl)
        console.log(this.$rcClient)
        console.log("I AM CHATBOT NAME")
        console.log(this.$envconfig.bot_name)
      api=this.$rcClient
      api.onError (error => this.errors.push (error))
      api.onCompletion (() => {
          console.log ("finished")
          //this.unsub()
          this.connected = false
          })
      api.onMessage (message => {
          //console.log("THESE ARE ALL THE MESAGGES")
          console.log(message)
          if(message.msg =="result" && message.result){
              if(message.result.rid && !this.connected){
              console.log("I am putting the room id in place")
              this.roomId = message.result.rid
              this.connectRoom()
              this.loadHistory()
              }
          }
         if(message.msg =="result" && message.result){
              if(message.result.messages && message.result.messages.length >0){
              console.log("In loading history")
              message.result.messages.reverse().forEach((message)=>{
                if(message.u.username != this.$envconfig.bot_name){
                  console.log("inside user msg")
                  console.log(message.u.username)
                  console.log(message.msg)
                  try {
                  console.log("IN TRY")
                  var true_msg = JSON.parse(message.msg)
                  console.log(true_msg)
                  this.messages.push({message:true_msg.message, user:message.u.username, id:message._updatedAt.$date})
                  console.log("AFT PUSH IN TRY")                  
                  }
                  catch(err) {
                    console.log("IN CATCH")
                    this.messages.push({message:message.msg, user:message.u.username, id:message._updatedAt.$date})                  
                    }

                }
                else{
                  this.messages.push({message:message.msg, user:message.u.username, id:message._updatedAt.$date})
                }
              })
              }
          }
          if(message.msg =="changed" && message.fields ){
            if (this.messages.filter(e => e.id === message.fields.args[0]._updatedAt.$date).length > 0) {
  
        }
        else{
          if(message.fields.args[0].u.username != this.$envconfig.bot_name){
          console.log("inside user msg")
            var true_msg = JSON.parse(message.fields.args[0].msg)
            this.messages.push ({message:true_msg.message, user:message.fields.args[0].u.username, id:message.fields.args[0]._updatedAt.$date})
          }
          else{
          console.log("inside chatbot msg")
          this.messages.push ({message:message.fields.args[0].msg, user:message.fields.args[0].u.username, id:message.fields.args[0]._updatedAt.$date})
          }
        }  
          }
      })
      /*api.onClose (() => {
        console.log ('closed')
      })*/
      api.connectToServer ()
      api.keepAlive().subscribe()
        /*.subscribe (() => {
            api.keepAlive () // Ping Server
          },
          (error) => {
            this.errors.push (error)
          }
        )*/

      // vérification pour mobile devices
      setInterval (function () {
          let now = new Date ().getTime ()
          console.log ('verify sync')
          if ((now - this.lastSync) > this.syncInterval) {
            console.log ('out of sync')
            this.syncPage ()
          }
        }, 2000
      ) // vérifie toutes les 1 sec que 30 sec ont passé depuis la dernière synchro
    },
    updated() {
      if(this.messages.length>0){
        const scrollArea = this.$refs.chat;
        const scrollTarget = scrollArea.getScrollTarget();
        const duration = 0; // ms - use 0 to instant scroll
        scrollArea.setScrollPosition(scrollTarget.scrollHeight, duration);
      }

        },
    methods: {
      getUserRole(){
        api.sendMessage(
          {
        "msg": "method",
        "method": "getUserRoles",
        "id":  '' + new Date ().getTime (),
        "params": []
    }
        )
      },
      decoWs() {
        let obj = api.webSocket
        for (var m in obj) {
          if (typeof obj[m] === "function") {
            console.log (m.toString ())
          }
        }
        api.webSocket.complete ()
      },
      recoWs() {
        api = rcApi.connectToRocketChat (this.webSocketUrl)
        api.onError (error => this.errors.push (error))
        api.onCompletion (() => console.log ("finished"))
        api.onMessage (message => {
          this.messages.push (message)
        })
        api.connectToServer ()
          .subscribe (() => {
              api.keepAlive () // Ping Server
            },
            (error) => {
              this.errors.push (error)
            }
          )
      },
      login() {
        if (!this.loggedIn) {
          api.loginWithAuthToken (this.authToken)
            .subscribe (apiEvent => {
              if (apiEvent.msg === 'result') {
                // success
                this.messages.push (apiEvent.msg)
                this.loggedIn = true
              }
            }, (error) => {
              this.errors.push (error)
            })
        }
      },
      loginBasic() {
        if (!this.loggedIn) {
          api.login (this.username, this.password)
            .subscribe (apiEvent => {
              if (apiEvent.msg === 'result') {
                // success
                //this.messages.push (apiEvent.msg)
                this.loggedIn = true
              }
            }, (error) => {
              this.errors.push (error)
            })
        }
      },
      connectRoom() {
        if (!this.roomConnected) {
            this.sub_id = '' + new Date ().getTime ()
          api.sendMessage ({
            "msg": "sub",
            "id": this.sub_id,
            "name": "stream-room-messages",
            "params": [
              this.roomId,
              false
            ]
          })
          this.connected = true
        }
      },
      unsub(){
        api.sendMessage ({
    "msg": "method",
    "method": "logout",
    "id":'' + new Date ().getTime () // changes according to the auth used
})
        console.log("unsubbed from the stream")
      },
      register(){
        console.log(this.user)
        this.username = this.user.id
        this.password = "kHLAuxDmXz8e"
        this.loginBasic()
        this.createMessage()
        this.layout = true
        //this.scrollToLastMessage()
      },
      loadHistory(){
        api.sendMessage(
          {
          "msg": "method",
          "method": "loadHistory",
          "id": '' + new Date ().getTime (),
          "params": [ this.roomId, null, 20, { "$date": 1480377601 } ]
          }
        )
      },
      createMessage(){
        console.log(api)
       api.sendMessage ({
          "msg": "method",
          "method": "createDirectMessage",
          "id": '' + new Date ().getTime (),
          "params": [this.$envconfig.bot_name]
          })
      },
      sendMessages() {
        console.log("SENDING MESSAGE")
        api.sendMessage ({
          "msg": "method",
          "method": "sendMessage",
          "id": '' + new Date ().getTime (),
          "params": [
            {
              "_id": '' + new Date ().getTime (),
              "rid": this.roomId,
              "msg": JSON.stringify({lang: this.$userLang, message:this.question})
            }
          ]
        })
        this.question = ''
        //console.log("I AM THE LIST OF MESSAGES")
        //console.log(this.messages)
      },
      formatMessage(message) {
        let result = {message}
        if (message.fields !== undefined &&
          message.fields.args !== undefined &&
          message.fields.args.length > 0 &&
          message.fields.args[0].ts !== undefined &&
          message.fields.args[0].ts.$date !== undefined
        ) {
          result.formattedDate = new Date (message.fields.args[0].ts.$date)
        }
        return result
      },
      syncPage() {
        this.lastSync = new Date ().getTime ()
        console.log ('Synch')
        if (this.connectedToApi && api && api.webSocket !== null && api.webSocket.socket == null) {
          // on log et on redémarre la fenêtre
          console.log ('reload')
          window.location.reload ()
        }
      }
    },
    beforeDestroy(){
      console.log("In before destroy")
      this.unsub()
      this.connected = false
    }
  }

</script>
<style scoped>
.pos{
    position: absolute;
    bottom: 16px;
    width:95%
}
</style>