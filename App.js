import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';

const CHOICES = [
  {
    name: 'rock',
    uri: 'http://pngimg.com/uploads/stone/stone_PNG13622.png'
  },
  {
    name: 'paper',
    uri: 'https://www.stickpng.com/assets/images/5887c26cbc2fc2ef3a186046.png'
  },
  {
    name: 'scissors',
    uri:
      'http://pluspng.com/img-png/png-hairdressing-scissors-beauty-salon-scissors-clipart-4704.png'
  }
];

const ChoiceCard = ({ player, choice: { uri, name } }) => {
  const title = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <View style={styles.choiceContainer}>
      <Text style={styles.choiceDescription}>
        {player}
      </Text>
      <Image style={styles.choiceImage} source={{ uri }} resizeMode='contain' />
      <Text style={styles.choiceCardTitle}>
        {title}
      </Text>
    </View>
  );
};

const ChoiceButton = props => {
  return (
    <TouchableOpacity
      style={styles.buttonStyle}
      onPress={() => props.onPress(props.choice)}>
      <Text style={styles.buttonText}>
        {props.choice.name.charAt(0).toUpperCase() + props.choice.name.slice(1)}
      </Text>
    </TouchableOpacity>
  )
};



export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gamePrompt: "Choose your weapon!",
      userChoice: CHOICES[0],
      computerChoice: CHOICES[0],
      total: 0,
      win: 0,
      loose: 0,
      tie: 0
    }
  }

  getResultColor = () => {
    if (this.state.gamePrompt === 'Defeat') {
      return 'red';
    } else if (this.state.gamePrompt === 'Victory') {
      return 'green';
    } else {
      return null;
    }
  }



  getResult = userChoice => {
    const computerChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];

    let result;
    if (userChoice.name !== computerChoice.name) {
      if (userChoice.name === 'rock') {
        result = computerChoice.name === 'paper' ? 'Defeat' : 'Victory';
      } else if (userChoice.name === 'paper') {
        result = computerChoice.name === 'scissors' ? 'Defeat' : 'Victory';
      } else if (userChoice.name === 'scissors') {
        result = computerChoice.name === 'rock' ? 'Defeat' : 'Victory';
      }
    } else {
      result = 'Tie';
    }
    return ([computerChoice, result]);
  }


  onPress = (userChoice) => {
    const [computerChoice, result] = this.getResult(userChoice);

    const newComputerChoice = computerChoice;
    const newUserChoice = userChoice;

    let value = 0;

    value = this.state.total + 1;
    this.setState({
      gamePrompt: result,
      userChoice: newUserChoice,
      computerChoice: newComputerChoice,
      total: value
    })

    if (result === 'Defeat') {
      value = this.state.loose + 1;
      this.setState({
        loose: value
      })
    } else if (result === 'Victory') {
      value = this.state.win + 1;
      this.setState({
        win: value
      })
    } else {
      value = this.state.tie + 1;
      this.setState({
        tie: value
      })
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 35, color: this.getResultColor() }}>{this.state.gamePrompt}</Text>
        <Text>Total : {this.state.total}</Text>
        <Text>Win : {this.state.win} ({this.state.total === 0 ? 0 : Math.floor(this.state.win / this.state.total * 100)} %) </Text>
        <Text>Loose : {this.state.loose} ({this.state.total === 0 ? 0 : Math.floor(this.state.loose / this.state.total * 100)} %) </Text>
        <Text>Tie : {this.state.tie} ({this.state.total === 0 ? 0 : Math.floor(this.state.tie / this.state.total * 100)} %) </Text>
        <View style={styles.choicesContainer}>
          <ChoiceCard player="Player" choice={this.state.userChoice} />
          <Text>VS</Text>
          <ChoiceCard player="Computer" choice={this.state.computerChoice} />
        </View>
        {
          CHOICES.map(choice => {
            return (
              <ChoiceButton key={choice.name} choice={choice} onPress={this.onPress} />
            )
          })
        }
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9ebee'
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    width: 200,
    margin: 10,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#640D14',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  choicesContainer: {
    margin: 10,
    borderWidth: 2,
    paddingTop: 100,
    shadowRadius: 5,
    paddingBottom: 100,
    borderColor: 'grey',
    shadowOpacity: 0.90,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { height: 5, width: 5 },
  },
  choiceContainer: {
    flex: 1,
    alignItems: 'center',
  },
  choiceDescription: {
    fontSize: 25,
    color: '#250902',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  choiceCardTitle: {
    fontSize: 30,
    color: '#250902'
  },
  choiceImage: {
    width: 150,
    height: 150,
    padding: 10,
  }
});
