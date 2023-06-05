 import {Dimensions, StyleSheet} from 'react-native'
 
 
 export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    paragraph: {
      fontSize: 18,
      textAlign: 'center',
    },
    map:{
      widht: Dimensions.get("window").width,
      height: Dimensions.get("window").height
    }
  });
  