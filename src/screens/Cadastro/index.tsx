import React, { useEffect, useState } from "react"
 import { View,Text,KeyboardAvoidingView, Alert } from "react-native"
import {MaterialIcons} from '@expo/vector-icons'
import {styles} from "./styles"
import { TextInput } from "react-native-gesture-handler"
import { colors } from "../../styles/colors"
import { Foundation } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { LoginTypes } from "../../navigations/login.navigation"
import { ComponentButtonInterface, ComponentLoading } from "../../components"
import { IRegister } from "../../services/data/User"
import { apiUser } from "../../services/data"
import { AxiosError } from "axios"
export interface IErrorApi{
  errors:{
    rule:string
    field: string
    message: string
  }[]
}
 export function Cadastrar({navigation}: LoginTypes){
  const [data,setData] = useState<IRegister>()
  const [isloading,setIsLoading] = useState(true)
  function handleChange(item: IRegister){
    setData({...data,...item})
  }
  async function handleRegister(){
    try{
      setIsLoading(true)
      if(data?.name && data.email && data.password){
        const response = await apiUser.register(data)
        Alert.alert(`${response.data.name} cadastrado!!!!!`)
        setIsLoading(false)
        navigation.navigate("Login")
      } else{
        Alert.alert("Preencha todos os campos")

      }
    }catch(error){
      const err= error as AxiosError
      const errorData = err.response?.data as IErrorApi
      let message = ""
      if(errorData){
        for (const iterator of errorData.errors){
          message = `${message} ${iterator.message} \n`
        }
      }
      Alert.alert(message)
      setIsLoading(false)
    }finally{ 
      setIsLoading(false)
    }
  }
  useEffect(()=>{
    setTimeout(()=>{
      setIsLoading(false)
    }, 2)
  }, [])
    return (
      <> 
        {isloading ? (
          <ComponentLoading/>
        ):(<View style={styles.container}>
          <KeyboardAvoidingView>
              <Text style={styles.title}>Cadastrar </Text>
              <View style={styles.formrow}>
                  <MaterialIcons name="email" style={styles.icon}/>
                  <TextInput
                    placeholder="E-mail"
                    placeholderTextColor={colors.black}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={(i)=> handleChange({email: i})}

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
                    onChangeText={(i)=> handleChange({password: i})}


                  />
              </View>
              <View style={styles.formrow}>
                  <MaterialCommunityIcons name="rename-box" size={24} color="black" />
                  <TextInput
                    placeholder="Nome"
                    placeholderTextColor={colors.black}
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={(i)=> handleChange({name: i})}


                  />
              </View>
              <ComponentButtonInterface title="Salvar" type="primary" onPressI={handleRegister}/>
              <ComponentButtonInterface title="Voltar" type="fourth" onPressI={()=>{navigation.navigate('Login')}}/>
          </KeyboardAvoidingView>
      </View>)}
        </>
        
    )
 }