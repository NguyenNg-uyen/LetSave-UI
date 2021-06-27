import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';

const DailyScreen = ({navigation}) => 
{
    return(
        <View style={styles.container}>
            <Text>DailyScreen</Text>
            <Button
            title="click here!"
            onPress={()=> alert('Button clicked')}
            />
        </View>
    )
}
export default DailyScreen;
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