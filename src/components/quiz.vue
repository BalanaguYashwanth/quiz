<template>
  <div>
      <h1> Quiz  </h1>
      
       time :- {{formattedElapsedTime}}
         <br>
    <div>
      <div v-for="(all, index) in alldata" v-bind:key="index">
        <div v-if="all.id == num">
            {{ all.id }})
            {{ all.q }}
            <br>
           <input type="radio" value="a" v-model="picked" >
           a) {{ all.a}}
            <br>
             <input type="radio" value="b" v-model="picked" >
           b) {{ all.b}}
            <br>
             <input type="radio" value="c" v-model="picked" >
           c) {{ all.c}}
            <br>
             <input type="radio" value="d" v-model="picked" >
           d) {{ all.d}}
        </div>
      </div>
      <button v-on:click="submit">submit</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      score:0,
      solution:{},
      alldata: "",
      num: 1,
      picked:'',
     
      t:0,
      once:1,
      seconds:0,
      minutes:0,
      hours:0,
      elapsedTime: 0,

    };
  },

computed: {
    formattedElapsedTime() {
      const date = new Date(null);
      date.setSeconds(this.elapsedTime / 1000);
      const utc = date.toUTCString();
      return utc.substr(utc.indexOf(":") - 2, 8);
    },
  },
 
  methods: {


      start() {
      this.timer = setInterval(() => {
        this.elapsedTime += 1000;
      }, 1000);
    },
    stop() {
      clearInterval(this.timer);
    },
    reset() {
      this.elapsedTime = 0;
    },

   
     
     verify:function(){
        if( this.picked == this.solution[this.num] )
        {
         this.score=this.score+10
          alert("correct answer")      
        }
        
        else{
            alert("your answer is wrong, correct answer is -->  option "+ this.solution[this.num] )
        }
     },

    
   

    submit: function () {

      if(this.picked!='') {

        this.verify()
        
      this.num = this.num + 1;
        if(this.num>10)
        {
            alert("your test is ended " );
            this.stop()
            if(this.score<50)
            {
                alert("your score is "+ this.score + " and time is "+ this.formattedElapsedTime +"s and failed the exam due to low score try again");
            }else if(this.score>=50) {
                alert("your score is "+ this.score +  " and time is " +this.formattedElapsedTime  + "s and passed the exam due to good score keep it up");
            }
            this.num=1
            this.score=0
            this.reset()
            this.$router.push('home');
        }
        
        }
        else{
            alert('please enter valid input')
        }

    },
  },

  

  created() {

   
   
    axios
      .get("https://quizappdjango.herokuapp.com/api/quiz/")
      .then((res) => {
        console.log(res.data)
        this.alldata = res.data
       
      }
      )
      .catch((err) => console.log(err));

    axios.get('https://quizappdjango.herokuapp.com/api/verify/')
        .then(res=>{
            console.log(res.data)
            let datas = res.data
            for(let obj in datas)
            {
                this.solution[datas[obj].questions]=datas[obj].answers
                // console.log(datas[obj].questions)
                // console.log(datas[obj].answers)
            }
            })
        .catch(err=>console.log(err))


    this.start()
   
    

},

};
</script>

<style>



</style>