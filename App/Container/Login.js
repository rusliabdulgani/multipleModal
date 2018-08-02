import React from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Dimensions,
  AsyncStorage,
  Alert
} from 'react-native'
import axios from 'axios'

const {width, height} = Dimensions.get('window')

export default class Login extends React.Component{
    state = {
        email: '',
        password: ''
    }

    login = () => {
        axios.post('https://reqres.in/api/login',{
            email: this.state.email,
            password: this.state.password
        })
        .then(result => {
            console.log('result', result)
            if (result.status == 200) {
                AsyncStorage.multiSet([['token', JSON.stringify(result.data.token)],['userData', JSON.stringify({email: this.state.email})]] )
                setTimeout(() => {
                    this.props.navigation.replace('TabHome')
                }, 200)
            }
        })
        .catch(err => {
            console.log('err', err.response)
            if (err.response.status == 400 && err.response.data.error == 'Missing password') {
                Alert.alert('Password cannot be empty!')
            } else if (err.response.status == 400 && err.response.data.error == 'Missing email or username') {
                Alert.alert('Email cannot be empty!')
            }
        })
    }

    render () {
        console.log('state', this.state.email, this.state.password)
        return (
            <View style={styles.container}>
                <View style={styles.textInputArea}>
                    <View style={styles.textInputPerItemArea}>
                        <Text style={styles.textStyle}>Email</Text>
                        <TextInput 
                            maxLength={30}
                            placeholder={'Please input your email'}
                            onChangeText={(email) => this.setState({email})}
                            style={styles.TextInputStyle}
                        />
                    </View>
                    <View style={[styles.textInputPerItemArea, {marginBottom: 30}]}>
                        <Text>Password</Text>
                        <TextInput 
                            maxLength={30}
                            placeholder={'Please input your password'}
                            onChangeText={(password) => this.setState({password})}
                            style={styles.TextInputStyle}
                            secureTextEntry={true}
                        />
                    </View>
                    <Button
                        title="Login"
                        color="#a30000"
                        onPress={() => this.login()}
                        accessibilityLabel="click to add a modal"
                    />
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInputArea: {
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        width: width * 0.7,
        padding: 20,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
        height: 2,
        width: 1
    },
    elevation: 3
    },
    textInputPerItemArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width*0.65,
    },
    TextInputStyle: {
        width: width*0.45,
        borderBottomWidth: 1,
        height: 40
    },
    textStyle: {
        marginRight: 10,
        fontSize: 16,
        justifyContent: 'flex-end'
    }
})
