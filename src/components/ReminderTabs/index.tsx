import * as React from "react";
import styled from "styled-components";
import { View, Text, TouchableOpacity } from "react-native";
import { FontSize, RespScreenWidth, RespScreenHeight } from "styles/sizes";
import ThemeStyle from "styles/theme";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
const Tabs = styled(View)`
flex-direction : row;
justifyContent : space-between;
border-bottom-width: 1px;
border-color: ${ThemeStyle.commonText};
padding-bottom : 10px;
margin-right : ${RespScreenWidth(4)};
margin-left : ${RespScreenWidth(4)};
margin-bottom : ${RespScreenHeight(3)};
`

const TouchTabs = styled(TouchableOpacity)`
`
const Tab = styled(Text)`
color : ${ThemeStyle.commonText};
font-size : ${props => props.active ? FontSize.xl : FontSize.lg};
margin-top : auto;
margin-bottom : auto;
opacity : ${props => props.active ? 1 : 0.5};
`

export default function ReminderTabs(props) {
    return (
        <Tabs>
            <TouchTabs onPress={() => props.changeTabs("overdue")}><Tab active={props.selectedTabs === "overdue"}>{'Overdue'}</Tab></TouchTabs>
            <TouchTabs onPress={() => props.changeTabs("upcoming")}><Tab active={props.selectedTabs === "upcoming"}>{'Upcoming'}</Tab></TouchTabs>
            <TouchTabs onPress={() => props.changeTabs("done")}><Tab active={props.selectedTabs === "done"}>{'Done'}</Tab></TouchTabs>
        </Tabs>

    )
}