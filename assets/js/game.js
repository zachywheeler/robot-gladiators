// function to generate a random numeric value
var randomNumber = function (min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};
// function to set name
var getPlayerName = function () {
  var name = '';

  // ***************************************
  // ADD LOOP HERE WITH PROMPT AND CONDITION
  // ***************************************
  while (name === '' || name === null) {
    name = prompt("What is your robot's name?");
  }
  console.log("Your robot's name is " + name);
  return name;
};
/* GAME INFORMATION / VARIABLES */
var playerInfo = {
  name: getPlayerName(),
  name: window.prompt("What is your robot's name?"),
  health: 100,
  attack: 10,
  money: 10,
  reset: function () {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  }, // comma!
  refillHealth: function () {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function () {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money!");
    }
  },
};
// You can also log multiple values at once like this
console.log(playerInfo.money, playerInfo.attack, playerInfo.health);

var enemyInfo = [
  {
    name: 'Roborto',
    attack: randomNumber(10, 14),
  },
  {
    name: 'Amy Android',
    attack: randomNumber(10, 14),
  },
  {
    name: 'Robo Trumble',
    attack: randomNumber(10, 14),
  },
];

// create function
fightOrSkip = function () {
  // ask player if they'd like to fight or skip using fightOrSkip function
  var promptFight = window.prompt(
    'Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.'
  );

  // Conditional Recursive Function Call
  if (promptFight === '' || promptFight === null) {
    window.alert('You need to provide a valid answer! Please try again.');
    return fightOrSkip();
    // if yes (true), leave fight
  }
  if (confirmSkip) {
    window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
    // subtract money from playerMoney for skipping, but don't let them go into the negative
    playerInfo.money = Math.max(0, playerInfo.money - 10);

    // return true if player wants to leave
    return true;
  }

  // if player picks "skip" confirm and then stop the loop
  promptFight = promptFight.toLowerCase();

  if (promptFight === 'skip') {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(
        playerInfo.name + ' has decided to skip this fight. Goodbye!'
      );
      // subtract money from playerMoney for skipping
      playerInfo.playerMoney = playerInfo.money - 10;
      shop();
    }
  }
};
var fight = function (enemy) {
  while (playerInfo.health > 0 && enemy.health > 0) {
    // ask player if they'd like to fight or run
    // repeat and execute as long as the enemy-robot is alive
    while (playerInfo.health > 0 && enemy.health > 0) {
      // ask player if they'd like to fight or skip using fightOrSkip function
      if (fightOrSkip()) {
        // if true, leave fight by breaking loop
        break;
      }
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(
          playerInfo.name + ' has decided to skip this fight. Goodbye!'
        );
        // subtract money from playerMoney for skipping
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        console.log('playerInfo.money', playerInfo.money);
        break;
      }
    }

    // remove enemy's health by subtracting the amount set in the playerAttack variable
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
    enemy.health = Math.max(0, enemy.health - damage);
    console.log(
      playerInfo.attack +
        ' attacked ' +
        enemy.name +
        '. ' +
        enemy.name +
        ' now has ' +
        enemy.health +
        ' health remaining.'
    );

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + ' has died!');

      // award player money for winning
      playerInfo.money = playerInfo.money + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
    }

    // remove players's health by subtracting the amount set in the enemyAttack variable
    var damage = randomNumber(enemy.attack - 3, enemy.attack);
    playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(
      enemy.name +
        ' attacked ' +
        playerInfo.name +
        '. ' +
        playerInfo.name +
        ' now has ' +
        playerInfo.health +
        ' health remaining.'
    );
    // check player's health
    if (playerInfo.health <= 0) {
      console.log(playerInfo.health);
      window.alert(playerInfo.name + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(
        playerInfo.name + ' still has ' + playerInfo.health + ' health left.'
      );
    }
  }
};

// function to start a new game
var startGame = function () {
  // reset player stats
  playerInfo.reset();

  for (var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
      window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

      var pickedEnemyObj = enemyInfo[i];

      pickedEnemyObj.health = randomNumber(40, 60);

      fight(pickedEnemyObj);

      // if we're not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
          // ask if player wants to use the store before next round
          var storeConfirm = window.confirm(
            'The fight is over, visit the store before the next round?'
          );
          // if yes, take them to the store() function
          if (storeConfirm) {
            shop();
            shop();
          }
        }
      }
    } else {
      window.alert('You have lost your robot in battle! Game Over!');
      break;
    }
  }

  endGame();
};

// end game
var endGame = function () {
  // if player is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert(
      "Great job, you've survived the game! You now have a score of " +
        playerInfo.money +
        '.'
    );
  } else {
    window.alert("You've lost your robot in battle.");
  }
  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm('Would you like to play again?');

  if (playAgainConfirm) {
    // restart the game
    startGame();
  } else {
    window.alert('Thank you for playing Robot Gladiators! Come back soon!');
  }
};
var shop = function () {
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  );
  // use switch to carry out action
  switch (shopOptionPrompt) {
    case 'REFILL':
    case 'refill':
      playerInfo.refillHealth();
      break;
    case 'UPGRADE':
    case 'upgrade':
      playerInfo.upgradeAttack();
      break;
    case 'LEAVE': // new case
    case 'leave':
      window.alert('Leaving the store.');
      break;
    default:
      window.alert('You did not pick a valid option. Try again.');
      shop();
      break;
  }
};
startGame();
