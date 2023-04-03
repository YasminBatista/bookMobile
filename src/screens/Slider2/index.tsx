import { FlatList, ImageBackground, View } from 'react-native';
import { IPage } from '../../../App';
import React from 'react'
import {
    ComponentButtonSlider, ComponentListMarker, ComponentTitleSlider
} from '../../components';
import { styles } from './styles';
export function Slider2({ setPageI }: IPage) {
    const slide1 = require("../Slider2/styles")
    const slide1Texts = [
        { id: '1', text: 'Duas opções:'},
        { id: '2', text: 'Primeira: pesquise o título do livro'},
        { id: '3', text: 'Segunda: pesquise o nome de outro autor de resenhas e ache o livro no seu perfil'},
    ]
    return (
        <ImageBackground source={slide1} style={styles.container} >
            <View style={styles.panel}>
                <ComponentTitleSlider titleI='Como ver outras resenhas?' />
                <FlatList
                    data={slide1Texts}
                    renderItem={({ item }) =>
                        <ComponentListMarker key={item.id} textMarker={item.text} />
                    }
                    keyExtractor={(item) => item.id}
                />
            </View>
            <View style={styles.buttonSlider}>
                <ComponentButtonSlider onPressI={() => setPageI(1)} cor={false} />
                <ComponentButtonSlider onPressI={() => setPageI(2)} cor={true}/>
                <ComponentButtonSlider onPressI={() => setPageI(3)} cor={false}/>
                <ComponentButtonSlider onPressI={() => setPageI(4)} cor={false}/>
                <ComponentButtonSlider onPressI={() => setPageI(5)} cor={false}/>
            </View>
        </ImageBackground>
    );

}