import React from 'react';
import { StyleSheet, Text, View,Button} from 'react-native';

const ProfileScreen = ({navigation}) => 
{
    return(
        <View style={styles.container}>
            <Text>ProfileScreen</Text>
            <Button
            title="click here!"
            onPress={()=> alert('Button clicked')}
            />
        </View>
    )
}
export default ProfileScreen;
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