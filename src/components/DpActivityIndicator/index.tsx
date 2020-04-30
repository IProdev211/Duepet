import { Modal, View, ActivityIndicator } from "react-native";
import * as React from "react";
import styled from "styled-components";
import ThemeStyle from "styles/theme";
import { connect } from "react-redux";
import { RespScreenHeight, FontSize } from "styles/sizes";

const ModalBackground = styled(View)`
flex: 1;
alignItems: center;
flexDirection: column;
justifyContent: space-around;
backgroundColor: #00000040;
`

const IndicatorWrapper = styled(View)`
backgroundColor: ${ThemeStyle.commonText};
height: ${RespScreenHeight(12)};
width: ${RespScreenHeight(12)};
borderRadius: ${RespScreenHeight(1.5)};
display: flex;
alignItems: center;
justifyContent: space-around;
`

const Indicator = styled(ActivityIndicator)`
color : ${ThemeStyle.backgroundLight}
`

function PresentLoader(props) {
    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={props.showLoader}
            onRequestClose={() => { console.log('close modal') }}>
            <ModalBackground>
                <IndicatorWrapper>
                    <Indicator
                        color={ThemeStyle.backgroundDark}
                        size="large"
                        animating={props.showLoader} />
                </IndicatorWrapper>
            </ModalBackground>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        showLoader: state.userReducer.showLoader,
    };
};


export default connect(mapStateToProps)(PresentLoader);