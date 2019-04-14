<template>
  <div></div>
</template>



<script>
export default {
  data() {
    return {
      iframeState: true
    };
  },
  mounted(){
      this.test()
  },
  methods: {
    test: function() {
      var e1 = new EventSource("http://localhost:8081/export/sse/event/message");
      e1.onerror=function(e){
          e1.close()
      };
      e1.onmessage = function(event) {
        console.log(event)
      };
      setInterval(function(){
          e1.close()
      },1000*60*10)
    }
  }
};
</script>