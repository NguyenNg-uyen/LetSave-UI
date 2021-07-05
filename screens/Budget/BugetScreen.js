import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';

const BudgetSreen = ({navigation}) => 
{
    return(
        <View style={styles.container}>
            <Text>BudgetScreen</Text>
            <Button
            title="click here!"
            onPress={()=> alert('Button clicked')}
            />
        </View>
    )
}
export default BudgetSreen;
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