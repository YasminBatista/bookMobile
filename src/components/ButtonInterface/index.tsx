import { TouchableOpacity, TouchableOpacityProps,Text} from 'react-native'
import { styles } from './styles'
import React from 'react'

export interface IBInterface  extends TouchableOpacityProps{
    onPressI: () => void
    title:string
    type: 'primary'| 'third' | 'fourth'
}
export function ButtonInterface({ onPressI,title,type, ...rest}: IBInterface) {
    return (
        <TouchableOpacity style = {

            type == "primary" ? styles.buttonPrimary :
              type == "fourth" ? styles.buttonFourth :
                styles.buttonFourth
            
        } onPress={onPressI} 
            {...rest}
            >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}