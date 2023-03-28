import { FlatList, ImageBackground, View } from 'react-native';
import { IPage } from '../../../App';
import React from 'react'
import {
    ComponentButtonSlider, ComponentListMarker, ComponentTitleSlider
} from '../../components';
import { styles } from './styles';
export function Slider1({ setPageI }: IPage) {
    const slide1 = require("../Slider1/styles")
    const slide1Texts = [
        { id: '1', text: 'Como fazer uma resenha?'},
        { id: '2', text: 'Tenha a opão de privar sua conta ou suas pastas.'},
        { id: '3', text: 'Oculte seu perfiç em mecanismos de pesquisa.'},
    ]
    return (
        <ImageBackground source={slide1} style={styles.container} >
            <View style={styles.panel}>
                <ComponentTitleSlider titleI='Privacidade e Segurança' />
                <FlatList
                    data={slide1Texts}
                    renderItem={({ item }) =>
                        <ComponentListMarker key={item.id} textMarker={item.text} />
                    }
                    keyExtractor={(item) => item.id}
                />
            </View>
            <View style={styles.buttonSlider}>
                <ComponentButtonSlider onPressI={() => setPageI(1)} cor={true} />
                <ComponentButtonSlider onPressI={() => setPageI(2)} cor={false}/>
                <ComponentButtonSlider onPressI={() => setPageI(3)} cor={false}/>
                <ComponentButtonSlider onPressI={() => setPageI(4)} cor={false}/>
            </View>
        </ImageBackground>
    );

}