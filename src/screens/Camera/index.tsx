import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, Alert, Text, Image, View } from 'react-native';
import { ComponentButtonInterface } from '../../components';
import {styles} from './styles'
import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker'
import { TouchableOpacity } from 'react-native-gesture-handler';
interface IPhoto{
    height: string
    uri: string
    widht: string
}


export  function CameraScreen() {
  const [type, setType] = useState(CameraType.back);
  const [permissionCamera, requestPermissionCamera] = Camera.useCameraPermissions();
  const [permissionMedia, requestPermissionMedia] = MediaLibrary.usePermissions();
  const [photo,setphoto] = useState<CameraCapturedPicture | ImagePicker.ImagePickerAsset>()
  const ref = useRef<Camera>(null)
  const [takePhoto, setTakePhoto] = useState(false);

  if (!permissionCamera) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permissionCamera.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Preciso de permissão para acessar a camera</Text>
        <Button onPress={requestPermissionCamera} title="garanta a permissão" />
      </View>
    );
  }
  if (!permissionMedia) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permissionMedia.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Preciso de permissão para acessar a galeria</Text>
        <Button onPress={requestPermissionMedia} title="garanta a permissão" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  async function takePicture() {
    if(ref.current){
        const picture = await ref.current.takePictureAsync()
        setphoto(picture)
    }
    
   }
  async function savePhoto(){
    const asset = await MediaLibrary.createAssetAsync(photo!.uri)
    MediaLibrary.createAlbumAsync("Images", asset, false)
    Alert.alert("Imagem salva com sucesso")
  }

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing:true,
      aspect: [4,3],
      quality: 1
    })
    if (!result.canceled) {
      setphoto(result.assets[0])
    }
  }

  return (
    <View style={styles.container}>
      {takePhoto ?(
      <>
        <Camera>
          <ComponentButtonInterface title='Virar' type='primary' onPressI={toggleCameraType}/>
          <Camera style={styles.camera} type={type} ref={ref} ratio='1:1'/>
          <ComponentButtonInterface title=' Tirar Foto' type='primary' onPressI={takePicture}/>
        </Camera>
        </>
      ):(
        <>
        <ComponentButtonInterface title=' Tirar Foto' type='primary' onPressI={()=>setTakePhoto(true)}/>
        <ComponentButtonInterface title='Salvar' type='primary' onPressI={savePhoto}/>
        <ComponentButtonInterface title='Abrir imagem' type='primary' onPressI={pickImage}/>
        {photo && photo.uri && (
           <Image source={{uri: photo!.uri}} style={styles.img} />

        )}
        </>
        )
     }
    </View>
  );
}