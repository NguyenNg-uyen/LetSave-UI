import React, { useState } from "react";
import {
   View,
   Text,
   Modal,
   TouchableOpacity,
   Alert,
   StyleSheet,
} from "react-native";
import moment from "moment";
import MonthPicker from "react-native-month-picker";
import { PINK, WHITE, BLACK } from "../../assets/color";

const styles = StyleSheet.create({
   container: {},
   input: {
      display: "flex",
      backgroundColor: PINK,
      paddingVertical: 12,
      paddingHorizontal: 20,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.46,
      shadowRadius: 5.14,
      elevation: 17,
      opacity: 0.9,
      borderRadius: 25,
      width: 120,
      marginVertical: 6,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      color: WHITE,
      textAlign: "center",
   },
   inputText: {
      color: WHITE,
      fontSize: 16,
      fontWeight: "bold",
   },
   contentContainer: {
      flexDirection: "column",
      justifyContent: "center",
      borderRadius: 15,
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
   },
   content: {
      backgroundColor: "#fff",
      marginHorizontal: 20,
      marginVertical: 70,
   },
   confirmButton: {
      borderWidth: 0.5,
      padding: 15,
      margin: 10,
      borderRadius: 5,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: PINK,
   },
});

function MonthPickerModal({ placeholder, sendMonthAndYear }) {
   const [isOpen, toggleOpen] = useState(false);
   const [value, onChange] = useState(null);

   return (
      <View style={styles.container}>
         <TouchableOpacity
            onPress={() => toggleOpen(true)}
            style={styles.input}
         >
            <Text style={styles.inputText}>
               {value ? moment(value).format("MM/YYYY") : placeholder}
            </Text>
         </TouchableOpacity>
         <Modal
            transparent
            animationType="fade"
            visible={isOpen}
            onRequestClose={() => {
               Alert.alert("Modal has been closed.");
            }}
         >
            <View style={styles.contentContainer}>
               <View style={styles.content}>
                  <MonthPicker
                     selectedDate={value || new Date()}
                     onMonthChange={onChange}
                  />
                  <TouchableOpacity
                     style={styles.confirmButton}
                     onPress={() => {
                        let month = parseInt(moment(value).format("MM"), 10);
                        let year = parseInt(moment(value).format("YYYY"), 10);
                        sendMonthAndYear(month, year);
                        toggleOpen(false);
                     }}
                  >
                     <Text
                        style={{
                           fontSize: 20,
                           fontWeight: "bold",
                           color: WHITE,
                        }}
                     >
                        Confirm
                     </Text>
                  </TouchableOpacity>
               </View>
            </View>
         </Modal>
      </View>
   );
}

MonthPickerModal.defaultProps = {
   placeholder: "Calendar",
};

export default React.memo(MonthPickerModal);
