# Mafia
Masterminding and Friendship, In A Game (MAFIA Game)

## Description
This is an online Mafia game where players are automatically given roles to play the game Mafia. Players are given time to discuss about who is mafia and vote on the person to kill. The person who is blamed as the mafia is given time to defend him or herself. The narration is done automatically, with various storylines. Depending on the number of the players, number of roles differ, too.

## Mockups

### Home
![home](public/images/Landing_Page.png "home")
Supports Facebook Login!

### Create or Join Room
![startGame](public/images/Join:Create.png "start")

You can either create or join an existing room. The following picture shows a list of existing rooms, sorted by time of creation and displaying players currently in the game.
![Rooms](public/images/Rooms.png "Room")

### Role Assignment
![Role](public/images/Role_Assignment.png "role")
Once the creator starts the game, players are assigned a role from the following list:
Mafia, Doctor, Police, and Villager

### Village and Player Status
![village](public/images/Player_Status.png "village")
This is a daytime page that display players' status. If dead, a player's name will display as red.

### Mafia Kill
![mafia](public/images/Mafia_Kill.png "mafia")
Only the Mafia will be able to chose people to kill.

### Doctor Heal
![doctor](public/images/Doctor_Heal.png "doctor")
Only the Doctor will be able to heal people.

### Police Reveal
![police](public/images/Police_Reveal.png "police")
Since I'm police in this demo, I'm able to reveal the role of one player per round.

### Vote
![vote](public/images/Voting.png "vote")
After the special roles have made their selections, everyone will discuss and vote for who they think is the mafia, and put them to death!

### Game Result
![result](public/images/Game_Result.png "result")
When there are only two players left, the game will end, and calculate and display the winner.

### Chat
![chat](public/images/chatbox.png "chat")

Thanks to Annie for this cool chatbox that supports emoji and multiple languages!

## Architecture

### Libraries
We're using React.js to compartmentalize the application, and also to make React Router available to us. We're planning to use Redux for storing the in-game information in global state, like current players, score, and who's in the graveyard.

We need a backend framework, and since we don't really know any better, we're going to use MongoDB with Mongoose and Express.

## Setup

clone this repository to your local filesystem

```sh
$ git clone git@github.com:dartmouth-cs52-17S/project-client-mafia.git
$ cd project-client-mafia
$ npm install
```

You should also clone the backend repo so you can access the api locally as well.

```sh
$ git clone git@github.com:dartmouth-cs52-17S/project-api-mafia.git
$ cd project-api-mafia
$ npm install
```

## Deployment

Deployment is done automatically with Travis CI to Surge and Heroku. Simply git push to master, and once travis checks clear, you're good to go. Navigate to [our site](http://mafia.surge.sh) and get going!

## Authors

- Annie Ke '19
- Nitasha Kochar '19
- Sia Peng '20
- Adam Rinehouse '19
- Andy Yoon '19

## Acknowledgments

Thanks to [Tim Tregubov](https://github.com/timofei7) for [this great walkthrough](http://cs52.me/assignments/sa/starterpack/) on building the frontend starterpack, as well as for [the backend starter](https://github.com/dartmouth-cs52/express-babel-starter).

Thanks to [Jason Feng](https://github.com/jason-feng), our global TA, as well.
