import { ActivityIndicator } from "react-native";
import { CenterScreen } from "styles/designSystem";
import * as React from "react";
import ThemeStyle from "styles/theme";


export default function DpLoader(props) {
    return (
        <CenterScreen>
            <ActivityIndicator size="large" color={ThemeStyle.backgroundDark} />
        </CenterScreen>
    )
}