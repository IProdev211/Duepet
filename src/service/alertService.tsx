import { Alert } from "react-native";


class AlertService {


    confirmAlert(title, subtitle) {
        return new Promise((resolve, reject) => {
            Alert.alert(
                title,
                subtitle,
                [
                    {
                        text: 'Cancel',
                        onPress: () => resolve(false),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => resolve(true) },
                ],
                { cancelable: false },
            );
        });
    }

}
export default new AlertService();