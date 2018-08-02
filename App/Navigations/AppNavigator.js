import { StackNavigator, createBottomTabNavigator } from 'react-navigation'


import Home from '../Container/Home'
import List from '../Container/List'
import Login from '../Container/Login'

const TabNavigations = createBottomTabNavigator({
    HOME: {screen: Home},
    LIST: {screen: List}
      
},{
    tabBarOptions: {
        activeTintColor: '#fff',
        activeBackgroundColor: '#a30000',
        labelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          paddingBottom: 10
        },
        style: {
          backgroundColor: 'bl#ffe5e5ue',
        },
      }
      
}
)

export default AppNavigator = StackNavigator(
    {
      Login: { screen: Login},
      TabHome: { screen: TabNavigations },
    //   List: { screen: List }
    },
    {
      headerMode: 'none',
      initialRouteName: 'TabHome',
    }
  )
  