<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">

              <img class="logo" src="./assets/cherrylogo.png">
                <form novalidate>
                  <div class="form-group">
                      <label v-validate="'required|email'" :class="{'is-danger': errors.has('email') }">Username:</label>
                      <input type="text" name="email" class="form-control" v-model="user.username" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }">
                      <p v-show="errors.has('email')" class="help is-danger text-right">{{ errors.first('email') }}</p>

                  </div>
                  <div class="form-group">
                      <label>Password:</label>
                      <input type="text" class="form-control" v-model="user.password">
                  </div>
                  <button class="btn" v-on:click.prevent="post">Sign In</button>
                </form>

            </div>
        </div>
    </div>
</template>

<script>

export default {
        data() {
            return {
               user: {
                   username: '',
                   password: ''
               }
             };
        },
        methods: {
        hash(password) {
          const CryptoJS = require("crypto-js");
          const secret = 'secret';
          const encrypted = CryptoJS.SHA1(password, secret);

          const sha1 = encrypted.toString()
          const hashedPassword = sha1;
          return hashedPassword;
        },

            post() {
            const hashedPassword = this.hash(this.user.password)
            console.log(hashedPassword);
            this.$http.post('https://mesa.cherryservers.com:8443/api/v1/client-sessions', {
              username: this.user.username,
              password: hashedPassword
            })
                   .then(response => {
                       console.log(JSON.parse(response.bodyText).hash);
                       const hash = JSON.parse(response.bodyText).hash
                       this.$http.get(`https://mesa.cherryservers.com:8443/api/v1/clients/${hash}`)
                       .then(response => {
                          const data = response.json();
                          console.log(data);
                       });

               }, error => {
                   console.log(error);
               });

            }

            }

        }

</script>

<style>
</style>
