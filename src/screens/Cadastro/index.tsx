import React from "react"
 import { 
        View,
        Text,
        KeyboardAvoidingView
     } from "react-native"
import {MaterialIcons} from '@expo/vector-icons'
import {styles} from "./styles"
import { TextInput } from "react-native-gesture-handler"
import { colors } from "../../styles/colors"
import { Foundation } from '@expo/vector-icons'; 


 
 export function Login(){
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView>
                <Text style={styles.title}>Login </Text>
                <View style={styles.formrow}>
                    <MaterialIcons name="email" style={styles.icon}/>
                    <TextInput
                      placeholder="E-mail"
                      placeholderTextColor={colors.black}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      style={styles.input}

                    />
                </View>
                <View style={styles.formrow}>
                    <Foundation name="key" size={23} color="black" />
                    <TextInput
                      placeholder="Senha"
                      placeholderTextColor={colors.black}
                      secureTextEntry={true}
                      autoCapitalize="none"
                      style={styles.input}

                    />
                </View>
            </KeyboardAvoidingView>
        </View>
    )
 }