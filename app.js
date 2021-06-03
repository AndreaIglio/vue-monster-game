function getRandomValue(min,max){
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data(){
        return{
         playerHealth: 100,
         monsterHealth: 100,
         currentRound: 0,
        };
    },
    computed: {
      playerHealthBar(){
        return {width: this.playerHealth + '%'}
      },
      monsterHealthBar(){
        return {width: this.monsterHealth + '%'}
      },
        mayUseSpecialAttack(){
          return this.currentRound % 3 !== 0;
        },
        mayHealPlayer(){
          return this.currentRound % 2 !== 0;
        }
    },
    watch: {
        playerHealth(value){

        },
        monsterHealth(value){

        },
    },
    methods: {
        attackMonster(){
            this.currentRound ++;
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            console.log(this.currentRound);


        },
        attackPlayer(){
          const attackValue = getRandomValue(8, 15);
          this.playerHealth -= attackValue;
        },
        attackSpecial(){
          this.currentRound ++;
          const attackValue = getRandomValue(10,25);
          this.monsterHealth -= attackValue;
          this.attackPlayer();
          console.log(this.currentRound)

        },
        healPlayer(){
            this.currentRound ++;
            const heal = getRandomValue(8,20);
            if(this.playerHealth + heal > 100){
                this.playerHealth = 100;
            }
            else{
                this.playerHealth += heal;
            }
            this.attackPlayer();
        }
    },
});

app.mount('#game');