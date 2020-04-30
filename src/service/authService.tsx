import React from "react";
import { DialogText } from "styles/designSystem";
import { Platform, Alert } from "react-native";


class AuthService {

    authErrorAlert(resp, props) {
        if (resp.errors && resp.errors.User && resp.errors.User.length > 0) {
            if (Platform.OS === "ios") {
                props.setDialogTitle("opps!");
                props.setDialogFooter(true);
                props.setDialogContain(<DialogText>{resp.errors.User[0]}</DialogText>);
                props.setDialog(true);
            } else {
                Alert.alert("opps!", resp.errors.User[0]);
            }

        } else if (resp.errors && resp.errors.user) {
            if (Platform.OS === "ios") {
                props.setDialogTitle("opps!");
                props.setDialogFooter(true);
                props.setDialogContain(<DialogText>{resp.errors.user}</DialogText>);
                props.setDialog(true);
            } else {
                Alert.alert("opps!", resp.errors.user);
            }
        }
    }

}
export default new AuthService();