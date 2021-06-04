function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logsList: [],
        };
    },
    computed: {
        playerHealthBar() {
            if (this.playerHealth <= 0) {
                return {width: 0 + '%'}
            } else {
                return {width: this.playerHealth + '%'}
            }
        },
        monsterHealthBar() {
            if (this.monsterHealth <= 0) {
                return {width: 0 + '%'}
            } else {
                return {width: this.monsterHealth + '%'}
            }
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        },
        mayHealPlayer() {
            return this.currentRound % 2 !== 0;
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                // alert('Draw game!');
                this.winner = 'Draw'
            } else if (value <= 0) {
                // alert('Monster wins!');
                this.winner = 'Monster'
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                // alert('Draw game!');
                this.winner = 'Draw'
            } else if (value <= 0) {
                // alert('Player wins!');
                this.winner = 'Player'

            }

        },
        winner(value) {
            // if(value === null){
            //     this.playerHealth = 100;
            //     this.monsterHealth = 100;
            //     this.winner = null;
            //     this.currentRound = 0;
            // }
        }
    },
    methods: {
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.currentRound = 0;
            this.logsList = [];
        },
        attackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            console.log(this.currentRound);
            this.battleLogs('Player','Attack',attackValue);

        },
        attackPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
            this.battleLogs('Monster','Attack',attackValue);
        },
        attackSpecial() {
            this.currentRound++;
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            console.log(this.currentRound)
            this.battleLogs('Player','SpecialAttack',attackValue);


        },
        healPlayer() {
            this.currentRound++;
            const heal = getRandomValue(8, 20);
            if (this.playerHealth + heal > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += heal;
            }
            this.attackPlayer();
            this.battleLogs('Player','Heal',heal);

        },
        surrender(){
            this.winner = 'Monster';
        },
        battleLogs(who, what, value){
          this.logsList.unshift({
            actionBy: who,
            actionType: what,
            actionValue: value,
          })
        },
    },
});

app.mount('#game');