import React, { Component } from 'react'
import { Text, View, SafeAreaView, Button, TouchableHighlight, ScrollView } from 'react-native'
import SingleTodo from './components/SingleTodo'
import FormInput from './components/FormInput'
import Realm from 'realm'
import { Todo } from './realm/schema'
import genId from './helpers/GenId'

export default class List extends Component {
  state = {
    todos: [],
    newTodo: '',
    schemaVersion: 1,
  }

  componentDidMount() {
    // this.migrationRealm()
    this.fetchTodo()
  }

  fetchTodo = () => {
    Realm.open({
      schema: [ Todo ],
      schemaVersion: this.state.schemaVersion,
    })
    .then(realm => {
      this.setState({ todos: realm.objects('Todo') });
    });
  }

  migrationRealm = () => {
    Realm.open({
      schema: [ Todo ],
      schemaVersion: this.state.schemaVersion,
      migration: (oldRealm, newRealm) => {
      }
    }).then(realm => {
      console.warn('success')
    });
  }

  setTodo = (input) => {
    this.setState({
        newTodo: input
    })
  }

  submit = () => {
    if (this.state.newTodo !== '') {
      Realm.open({
        schema: [ Todo ],
        schemaVersion: this.state.schemaVersion,
      })
      .then(realm => {
        realm.write(() => {
            realm.create('Todo', { name: this.state.newTodo, id: genId() });
        });
        this.setState({
          todos: realm.objects('Todo'),
          newTodo: ''
        })
      });
    } else {
      alert('Input must be filled')
    }
  }

  deleteTodo = (el) => {
    Realm.open({
      schema: [ Todo ],
      schemaVersion: this.state.schemaVersion,
    })
    .then(realm => {
      realm.write(() => {
          realm.delete(el)
      });
      this.setState({
        todos: realm.objects('Todo')
      })
    });
  }

  deleteAll = () => {
    Realm.open({
      schema: [ Todo ],
      schemaVersion: this.state.schemaVersion
    })
    .then(realm => {
      realm.write(() => {
        let allTodo = realm.objects('Todo');
        realm.delete(allTodo)
      });
      this.setState({
        todos: []
      })
    });
  }

  edit = (el, input) => {
    Realm.open({
      schema: [ Todo ],
      schemaVersion: this.state.schemaVersion,
    })
    .then(realm => {
      realm.write(() => {
        el.name = input
      });
      this.setState({
        todos: realm.objects('Todo'),
      })
    });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>

          <TouchableHighlight onPress={ this.deleteAll }>
            <Text style={{ fontSize: 24, textAlign: 'right', marginTop: 20 }}>
              Clear 
            </Text>
          </TouchableHighlight>

          <View style={{ flexDirection: 'row', height: 80}}>

            <FormInput newTodo={this.setTodo} val={this.state.newTodo}/>

            <View style={{ justifyContent: 'center', alignItems: 'center', height: 40, marginTop: 17, marginLeft: 20 }}>
                <TouchableHighlight onPress={this.submit} style={{ borderRadius: 5, backgroundColor: 'black', width: 60, height: 30, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 24 }}>Add</Text>
                </TouchableHighlight>
            </View>

          </View>
          <View style={{ flex: 1 }}>
            {
              this.state.todos && this.state.todos.map((el, i) => {
                return (
                    <SingleTodo key={i} todo={el} edit={this.edit} del={this.deleteTodo} />
                )
              })
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
