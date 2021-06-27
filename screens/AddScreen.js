import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';

const AddScreen = ({navigation}) => 
{
    return(
        <View style={styles.container}>
            <Text>AddScreen</Text>
            <Button
            title="click here!"
            onPress={()=> alert('Button clicked')}
            />
        </View>
    )
}
export default AddScreen;
const styles = StyleSheet.create(
    {
        container:
        {
            flex:1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:'#FF3378'
        },
    });