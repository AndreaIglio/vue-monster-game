function getRandomValue(min,max){
    return Math.floor(Math.random() * (max-min))+ min;
}

const app = Vue.createApp({
    data(){
        return{
         playerHealth: 100,
         monsterHealth: 100,
        }
    },
    methods: {
        //mia soluzione
        // attack(health, min, max){
        //     let attackValue = Math.floor(Math.random() * (max-min))+ min;
        //     return health -= attackValue;
        // },
        attackMonster(){
            const attackValue = getRandomValue(5,12);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
        },
        attackPlayer(){
          const attackValue = getRandomValue(8,15);
          this.playerHealth -= attackValue;
        },
        attackSpecial(){

        },
    },
    computed: {

    }
});

app.mount('#game');