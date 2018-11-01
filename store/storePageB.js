export default {
  data: {
    firstName: 'pageB',
    lastName: 'pageB',
    fullName: function(){
      return this.firstName + this.lastName
    },
  },
}