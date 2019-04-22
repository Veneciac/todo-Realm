import React, { Component } from 'react'
import { Text, View, TouchableHighlight, TextInput } from 'react-native'

export default class SingleTodo extends Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', height: 50, alignItems: 'center', borderRadius: 5, margin: 5, backgroundColor: 'white'}}>
        <TextInput style={{ flex: 3, textAlign: 'left', fontSize: 23 }} value={this.props.todo.name} onChangeText={(text) => this.props.edit(this.props.todo, text)}/>
        <View style={{ flex: 1, flexDirection: 'row'}}>
          <TouchableHighlight style={{ flex: 1, alignItems: 'center' }} onPress={() => this.props.del(this.props.todo)}>
            <Text>
              Delete
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}
