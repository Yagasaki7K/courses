import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
    let FindYourPet = 'https://findyourpet.vercel.app/assets/logo-white.540e2d43.png'

    return (
        <View style={styles.container}>

            <Image 
            source={{uri: FindYourPet}}
            style={{height: 100, width: 100}}/>


            <Text style={{marginTop: 50}}>I got black</Text>
            <Text style={styles.text}>I got white</Text>
            <Text>What you want</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#703edb',
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        color: '#fff'
    }
});
