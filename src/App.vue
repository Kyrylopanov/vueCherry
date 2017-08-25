<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">

              <img class="logo" src="./assets/cherrylogo.png">
                <form novalidate>
                  <div class="form-group">
                      <label v-validate="'required|email'" :class="{'is-danger': errors.has('email') }">Email address:</label>
                      <input type="text" name="email" class="form-control" v-model="user.email" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }">
                      <p v-show="errors.has('email')" class="help is-danger text-right">{{ errors.first('email') }}</p>

                  </div>
                  <div class="form-group">
                      <label>Password:</label>
                      <input type="text" class="form-control" v-model="user.password">
                  </div>
                  <button class="btn" @click="submit">Sign In</button>
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
                   email: '',
                   password: ''
               }
             };
        },
        methods: {
            submit() {
               this.$http.post('https://mesa.cherryservers.com:8443/api/v1/client-sessions', this.user)
                   .then(response => {
                       console.log(response);
               }, error => {
                   console.log(error);
               });
               this.$http.get("https://mesa.cherryservers.com:8443/api/v1/clients/{hash}" )
               .then(response => {
                  const data = response.json();
                  console.log(data);
               });
            }

        }
    }
</script>

<style>
</style>
