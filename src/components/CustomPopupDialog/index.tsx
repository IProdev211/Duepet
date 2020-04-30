import { View } from "react-native";
import * as React from "react";
import Dialog, { DialogFooter, DialogButton, DialogContent, FadeAnimation, DialogTitle } from 'react-native-popup-dialog';
import { connect } from "react-redux";
import { setDialog, setDialogTitle, setDialogContain, setDialogFooter } from "../../redux/actions";
import { FontSize } from "styles/sizes";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";


function PopupDialog(props) {
    return (
        <View>
            <Dialog
                width={0.9}
                visible={props.showDialog}
                dialogTitle={<DialogTitle textStyle={{ fontSize:  18}} title={props.dialogTitle} />}
                dialogAnimation={new FadeAnimation({
                    initialValue: 0, // optional
                    animationDuration: 150, // optional
                    useNativeDriver: true, // optional
                })}
                footer={
                    props.dialogFooter ?
                        <DialogFooter>
                            <DialogButton
                                text="OK"
                                onPress={() => { props.setDialog(false); }}
                            />
                        </DialogFooter> : null
                }
            >
                <DialogContent style={{ minHeight: hp(10) , paddingTop: hp(1) , }}>
                    {props.dialogContain ? props.dialogContain : null}
                </DialogContent>
            </Dialog>
        </View>
    );
}


const mapStateToProps = state => {
    return {
        showDialog: state.userReducer.showDialog,
        dialogTitle: state.userReducer.dialogTitle,
        dialogContain: state.userReducer.dialogContain,
        dialogFooter: state.userReducer.dialogFooter,
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setDialog: value => dispatch(setDialog(value)),
        setDialogTitle: value => dispatch(setDialogTitle(value)),
        setDialogContain: value => dispatch(setDialogContain(value)),
        setDialogFooter: value => dispatch(setDialogFooter(value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PopupDialog);