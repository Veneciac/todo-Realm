import React, { Component } from 'react'
import { Text, View, TextInput } from 'react-native'

export default class FormInput extends Component {
  render() {
    return (
        <TextInput
          style={{
            height: 40,
            marginBottom: 10,
            borderColor: 'black',
            borderWidth: 1,
            backgroundColor: 'white',
            padding: 10,
            color: 'black',
            marginTop: 20,
            marginLeft: 5,
            marginRight: 5,
            borderRadius: 10,
            width: 250
          }}
          placeholder="New Todo"
          value={this.props.val}
          onChangeText={this.props.newTodo}
        />
    )
  }
}
