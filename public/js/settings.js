new Vue({
  el: '#app',
  vuetify: new Vuetify({ theme: { dark: true } }),
  data: () => ({
    token: '',
    goal: null,
    tasks: [],

    settingsForm: false,
    tokenShow: false,
    success: false,
    error: false,
    rules: {
      required: value => !!value || 'Required field!',
      task: value => value && !!value.length || 'There must be at least one task!',
      min: value => parseFloat(value) > 0 || 'Number must be greater than 0!'
    }
  }),
  mounted () {
    axios.get('/api/settings').then(({ data }) => {
      this.token = data.token
      this.goal = data.goal
      this.tasks = data.tasks
    })
  },
  methods: {
    save () {
      if(this.settingsForm) {
        const token = this.token
        const goal = this.goal
        const tasks = this.tasks
        axios
          .post('/api/settings', { token, goal, tasks })
          .then(() => this.success = true, () => this.error = true)
      } else this.$refs.settingsForm.validate()
    }
  }
})