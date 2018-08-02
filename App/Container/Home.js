import React, {Component} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Alert,
  Button,
  TouchableOpacity,
  Dimensions,
  AsyncStorage
} from 'react-native';
import axios from 'axios'

import Modal from 'react-native-modal'

const {width, height} = Dimensions.get('window')

export default class Home extends Component {

    state = {
      modals: [],
      visible: true,
      visibleModalWelcome: true,
      userData: {},
      ref: []
    }

  componentWillMount () {
    AsyncStorage.getItem('userData')
    .then(res => {
        console.log('res', res)
        this.setState({
            userData: JSON.parse(res)
        })
    })
  }

  removeModal = () => {
    let filteredArray = this.state.modals.filter(item => console.log(item.key, this.state.ref[item.key]))
    console.log('index', filteredArray)
    this.setState({modals: filteredArray});
  }

  alertConfirmLogout = () => {
    Alert.alert(
        'Logout',
        'Are You sure want to Logout from app?',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => this.logout()},
        ],
        { cancelable: false }
    )
  }

  logout = () => {
    AsyncStorage.clear()
    this.props.navigation.replace('Login')
  }

  addModal = () => {
    this.setState({
      ref: [...this.state.ref, this.state.ref.length]
    })
    const newModal = 
    <Modal isVisible={true} backdropOpacity={0.5} key={this.state.ref.length}>
      <View style={[styles.modalContainer, {top: 100/this.state.ref.length+1}]}>
          <Text style={{marginBottom: 100, fontSize: 30}}>Modal {this.state.ref.length}</Text>
          <TouchableOpacity onPress={() => this.removeModal()} style={{width: 100, height: 30, backgroundColor: '#a30000', borderRadius: 5, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: '#fff'}}>(X)close</Text>
          </TouchableOpacity>
      </View>
    </Modal>
    setTimeout(() => {
      this.setState({
        modals: [...this.state.modals, newModal],
      })
    }, 2000);
  }

  render() {
    let { modals, userData } = this.state
    console.log('user', userData)
    return (
      <View style={styles.container}>
        {
          modals
        }
            <Modal isVisible={this.state.visibleModalWelcome} backdropOpacity={0.5}>
            {/* <Modal isVisible={false} backdropOpacity={0.5}> */}
            <View style={styles.modalContainer}>
                <Text style={{marginBottom: 100, fontSize: 30}}>Welcome {this.state.userData.email}</Text>
                <TouchableOpacity onPress={() => this.setState({visibleModalWelcome: false})} style={{width: 100, height: 30, backgroundColor: '#a30000', borderRadius: 5, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: '#fff'}}>(X)close</Text>
                </TouchableOpacity>
            </View>
            </Modal>
        <Button 
          title="Add Modal"
          color="#a30000"
          onPress={() => this.addModal()}
          accessibilityLabel="click to add a modal"/>
        <View style={{marginBottom: 30}}/>
        <Button 
        title="Logout"
        color="#a30000"
        onPress={() => this.alertConfirmLogout()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  modalStyle: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.4,
    borderRadius: 10
  }
});
