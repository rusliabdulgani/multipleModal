import React from 'react'
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Dimensions,
    Image,
    ActivityIndicator
} from 'react-native'
import axios from 'axios'

const {width, height} = Dimensions.get('window')

export default class List extends React.Component{
    state = {
        userList: [],
        total_pages: 0,
        page: 0,
        loadmore: false
    }

    componentDidMount () {
        axios.get('https://reqres.in/api/users?page=1')
        .then(result => {
            this.setState({
                userList: result.data.data,
                total_pages: result.data.total_pages,
                page: result.data.page,
            })
        })
        .catch(err => {
            console.log('err', err)
        })
    }

    getDataUser = (url) => {
        this.setState({
            loadmore: true
        })
        axios.get(url)
        .then(result => {
            this.setState({
                userList: [...this.state.userList, ...result.data.data],
                total_pages: result.data.total_pages,
                page: result.data.page,
                loadmore: false
            })
        })
        .catch(err => {
            console.log('err', err)
            this.setState({
                loadmore: false 
            })
        })
    }


    handleLoadMore = () => {
        let {total_pages, page} = this.state
        if (page <= total_pages) {
            this.getDataUser(`https://reqres.in/api/users?page=${page+1}`)
        }
    }

    renderFooter = () => {
        if (!this.state.loadmore) return null
        return (
            <View style={{
                paddingVertical: 20, 
                borderTopWidth: 1,
                borderColor: "#CED0CE"}}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        )
    }

    renderItem = ({item}) => {
        return (
            <View style={styles.cardStyle} key={item.id}>
                <Image source={{uri: item.avatar}} style={styles.imageAvatar}/>
                <View style={styles.cardBottomStyle}>
                    <Text style={styles.listText}>Full Name: {item.first_name + " " + item.last_name}</Text>
                </View>
            </View>
        )
    }

    render () {
        console.log('data', this.state.userList)
        return (
            <View style={styles.container}>
                <View style={{marginBottom: 70}}/>
                <View style={styles.header}>
                    <Text style={styles.headerText}>User List</Text>
                </View>
                <FlatList 
                    data={this.state.userList}
                    renderItem={this.renderItem}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={this.renderFooter()}
                    onEndReached={this.handleLoadMore}
                    // keyExtractor={(item, index) => index}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#fff'
    },
    header: {
        height: height * 0.1,
        width: width,
        position: 'absolute',
        top: 0,
        left: 0,
        elevation: 3,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 16,
    },
    cardStyle: {
        width: width*0.9,
        height: height*0.4,
        padding: 20,
        paddingTop: 0,
        marginTop: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 2,
        alignItems: 'center',
        overflow:'hidden',
    },
    cardBottomStyle: {
        position: 'absolute', 
        width: width*0.9,
        flexDirection: 'row',
        bottom: 0,
        backgroundColor: '#f43f85', 
        borderBottomLeftRadius: 5, 
        borderBottomRightRadius: 5,
        paddingRight: 20, paddingLeft: 20
    },
    listText: {
        padding: 10,
        fontSize: 16,
        color: '#fff'
    },
    imageAvatar: {
        width: width,
        height: height*0.38,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        resizeMode: 'cover'
    }
})