<template>
<div class="q-pa-md q-gutter-sm">
    <q-btn label="Click me" color="primary" @click="register" />
    <q-dialog v-model="layout">
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-page-container>
          <q-page padding>
            <div  v-if="messages.length > 0">
            <q-chat-message
            v-for="message in messages"
            :key="message.id"
            :name="message.user"
            :text="[message.message]"
            :sent="message.user =='rasa_bot'"
            />
              </div>
            <div class="row pos">
             <div class="col-10">
            <q-input dense outlined v-model="question" label="Outlined" />
            </div>
            <div class="col-2">
            <q-btn class="button" size="15px" style="width:100%" color="accent" unelevated no-caps  text-color="white" :label="$t('button.save')" @click="sendMessages()" />
            </div>
            </div>
          </q-page>
        </q-page-container>
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
      api=this.$rcClient
      api.onError (error => this.errors.push (error))
      api.onCompletion (() => {
          console.log ("finished")
          //this.unsub()
          this.connected = false
          })
      api.onMessage (message => {
          console.log("THESE ARE ALL THE MESAGGES")
          console.log(message)
          if(message.msg =="result" && message.result){
              if(message.result.rid && !this.connected){
                //console.log("I am putting the room id in place")
              this.roomId = message.result.rid
              this.connectRoom()
              }

          }
          if(message.msg =="changed" && message.fields ){
              //console.log("IN message changed")
              //console.log(message.fields.args[0]._updatedAt)
            if (this.messages.filter(e => e.id === message.fields.args[0]._updatedAt.$date).length > 0) {
  
        }
        else{
            //console.log("IN PUSH")
            //console.log(message)
            this.messages.push ({message:message.fields.args[0].msg, user:message.fields.args[0].u.username, id:message.fields.args[0]._updatedAt.$date})
        }   
          }
        //se ping lo butto, se errore lo metto negli errori, se resto lo formatto come la q-chat vuole e poi lo pusho lì.
      })
      /*api.onClose (() => {
        console.log ('closed')
      })*/
      api.connectToServer ()
        .subscribe (() => {
            api.keepAlive () // Ping Server
          },
          (error) => {
            this.errors.push (error)
          }
        )

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
          this.connected = false
        }
      },
      unsub(){
        api.sendMessage ({
        "msg": "method",
        "method": "leaveRoom",
        "id": '' + new Date ().getTime (),
        "params": [
            this.roomId
        ]
        })
        console.log("unsubbed from the stream")
      },
      register(){
        this.layout = true
        console.log(this.user)
        this.username = this.user.id
        this.password = "kHLAuxDmXz8e"
        this.loginBasic()
        this.createMessage()
        
      },
      createMessage(){
        console.log(api)
       api.sendMessage ({
          "msg": "method",
          "method": "createDirectMessage",
          "id": '' + new Date ().getTime (),
          "params": ["rasa_bot"]
          })
      },
      sendMessages() {
        api.sendMessage ({
          "msg": "method",
          "method": "sendMessage",
          "id": '' + new Date ().getTime (),
          "params": [
            {
              "_id": '' + new Date ().getTime (),
              "rid": this.roomId,
              "msg": this.question
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