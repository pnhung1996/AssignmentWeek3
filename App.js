import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

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

const ChoiceButton = props => {
  <TouchableOpacity
    style={styles.buttonStyle}
    onPress={props.onPress(props.name)}>
    <Text style={styles.buttonText}>
      {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
    </Text>
  </TouchableOpacity>
}

const ChoiceCard = ({ player, choice: { uri, name } }) => {
  const title = choice.name.charAt(0).toUpperCase() + choice.name.slice(1);
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
  )
}

export default class App extends Component {
  
  getResult = userChoice => {
    const computerChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];

    const result = "";
    if()
  }
  
  onPress = userChoice => {
    const[computerChoice, result] = getResult(userChoice);
  }


  constructor(props) {
    super(props);
    this.state = {
      gamePrompt = "Choose your weapon!",
      userChoice = "",
      computerChoice = ""
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.gamePrompt}</Text>
        <View style={styles.choicesContainer}>
          <ChoiceCard player="Player" choice={userChoice} />
          <Text>VS</Text>
          <ChoiceCard player="Computer" choice={computerChoice} />
        </View>
        {
          CHOICES.map((choice) => {
            return (
              <ChoiceButton key={choice.name} name={choice.name} onPress={this.onPress(choice)} />
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
