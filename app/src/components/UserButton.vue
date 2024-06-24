<template>
  <q-btn color="white" @click="routing()" round>
    <q-avatar size="42px" data-cy="userButton">
      <q-icon
        v-if="!this.$auth.loggedIn() || !this.userpic"
        name="img:statics/icons/Icon (Header) - Profile Avatar.svg"
      />
      <img v-if="this.$auth.loggedIn()" :src="this.userpic" />
    </q-avatar>
  </q-btn>
</template>

<script>
import storeMappingMixin from "../mixin/storeMappingMixin";

export default {
  name: "UserButton",
  mixins: [
    storeMappingMixin({
      getters: {
        user: "user/users",
        authuser: "auth/user",
      },
      actions: {
        fetchSpecificUser: "user/fetchSpecificUser",
      },
    }),
  ],
  data() {
    return {
      userpic: null,
    };
  },
  methods: {
    routing() {
      if (!this.$auth.loggedIn()) {
        this.toLogin();
      } else {
        this.$router.push({ name: "profile" });
      }
    },
    toLogin() {
      this.$keycloak.login();

    },
    toLogout() {
      console.log("LOGGING OUT");
      this.$auth.logout();
    },
    toSettings() {
      //console.log("LOGGING OUT")
      this.$router.push({ name: "profile" });
    },
  },
  created() {
    //var userId = this.$store.state.auth.user.umid
    if (this.$store.state.auth.user != null) {
      this.fetchSpecificUser(this.$store.state.auth.user.sub).then((user) => {
        console.log(user);
        if (user?.userPicture) {
          this.userpic = user.userPicture.picture;
        } else {
          this.userpic = null;
        }
      });
    }
  },
};
</script>
