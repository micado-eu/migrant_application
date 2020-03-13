<template>
  <div class="speech">
   <span>You said: {{ userSaid }}</span>
  </div>
</template>

<script>

import * as annyang  from 'annyang'

console.log("speech comp")
console.log(annyang)


export default {

  data () {
    return {
      listening: false,
      debug: true,
      userSaid: '',
      annyang,
      speechCommands: {
        'documenti': this.jumpto,
        '*allSpeech': function (allSpeech) {
          console.debug('catchall', allSpeech)
        }
      },
      registeredCommands: []
    }
  },
  created () {
    var self = this
    
    if (this.annyang) {
//      var annyang = window.annyang
      // Add our commands to annyang
      this.annyang.addCommands(this.speechCommands)
      for (var command in this.speechCommands) {
        console.log('registered', command)
        self.registeredCommands.push(command)
      }

      // Tell KITT to use annyang
//      SpeechKITT.annyang()

      // Define a stylesheet for KITT to use
//      SpeechKITT.setStylesheet(require('../css/flat.css'))

//      SpeechKITT.setInstructionsText('Try saying...')
      // self.showRandomCommand()
///      setInterval(self.showRandomCommand, 11 * 1000)

      // Render KITT's interface
//      SpeechKITT.vroom()

//      SpeechKITT.toggleRecognition()

this.annyang.addCallback('result', function(phrases) {
  console.log("I think the user said: ", phrases[0]);
  console.log("But then again, it could be any of the following: ", phrases);
  self.userSaid = phrases[0];
})
/*

navigate() {
                router.push({ name: "Page1" });
            }

      this.annyang.addCallback('resultMatch', function (userSaid, commandText, phrases) {
        setTimeout(function () { self.userSaid = '' }, 4 * 1000)
        // console.log(userSaid) // sample output: 'hello'
        // console.log(commandText) // sample output: 'hello (there)'
        // console.log(phrases) // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']
      })

      this.annyang.addCallback('resultNoMatch', function (userSaid, commandText, phrases) {
        setTimeout(function () { self.userSaid = '' }, 4 * 1000)
        // console.log(userSaid) // sample output: 'hello'
        // console.log(commandText); // sample output: 'hello (there)'
        // console.log(phrases) // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']
      })

      this.annyang.addCallback('interimResult', function (userSaid, commandText, phrases) {
        self.userSaid = userSaid
        // console.log(userSaid) // sample output: 'hello'
        // console.log(commandText) // sample output: 'hello (there)'
        // console.log(phrases) // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']
      })
*/
      this.annyang.addCallback('error', function (e) {
        console.error(e) // sample output: 'hello'
      })
      //this.start()
      this.annyang.debug(this.debug)
    }
  },
  methods: {
    showRandomCommand: function () {
      var rand = this.registeredCommands[Math.floor(Math.random() * this.registeredCommands.length)]
      window.SpeechKITT.setSampleCommands([rand])
    },
    jumpto: function(allSpeech) {
     console.log("in jump to")
     console.log(this)
     console.debug('documenti', allSpeech)
     console.log("gioppo")
     console.log(allSpeech)
      
     console.log(this)
     this.$router.push({ path: "/documents" });
    },
    start: function(){
      this.annyang.setLanguage("it-IT")
      this.annyang.start({ autoRestart: true, continuous: true, paused: false });
    },
    pause: function(){
      this.annyang.abort()
    },
    resume: function(){
      this.annyang.resume()
    }
  },
  events: {
    'speech': function (msg) {
      console.debug('speech', msg)
      this.$emit(msg['directive'], msg)
    },
    'addcommands': function (msg) {
      this.annyang.addCommands(msg['message'])
      for (var command in msg['message'].valueOf()) {
        console.debug('registered', command)
        this.registeredCommands.push(command)
      }
    }
  }
}
</script>

<style >

</style>
