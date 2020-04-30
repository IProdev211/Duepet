import * as Types from "../actions/actions";
import * as Actions from "../actions";
import { put, takeLatest } from "redux-saga/effects";
import LabelUtils from "./LabelUtils";
import sessionService from "service/sessionService";

function* addLabelData(actionData) {
    try {
        actionData.showLoader(true);
        const userData = yield sessionService.getStorageData("userData");
        const savedData = yield LabelUtils.addLabelData(actionData.labelData, userData.token);
        yield put(Actions.getAllLabel(actionData.showLoader));
        actionData.navigation.navigate("Label");
    } catch (error) {
        actionData.showLoader(false);
        yield put(Actions.apiFailure(error));
    }
}

function* updateLabelData(actionData) {
    try {
        actionData.showLoader(true);
        const userData = yield sessionService.getStorageData("userData");
        const savedData = yield LabelUtils.updateLabelData(actionData.labelData, userData.token);
        yield put(Actions.getAllLabel(actionData.showLoader));
        actionData.showLoader(false);
        actionData.navigation.navigate("Label");
    } catch (error) {
        actionData.showLoader(false);
        yield put(Actions.apiFailure(error));
    }
}

function* removeLabel(actionData) {
    try {
        actionData.showLoader(true);
        const userData = yield sessionService.getStorageData("userData");
        const savedData = yield LabelUtils.removeLabel(actionData.labelData, userData.token);
        actionData.showLoader(false);
        yield put(Actions.getAllLabel(actionData.showLoader));
    } catch (error) {
        actionData.showLoader(false);
        yield put(Actions.apiFailure(error));
    }
}

function* getLabelByUser(actionData) {
    try {
        actionData.showLoader(false);
        const userData = yield sessionService.getStorageData("userData");
        const userLabel = yield LabelUtils.getLabelByUser(userData.id, userData.token);
        actionData.showLoader(false);
        yield put(Actions.loadLabelData(userLabel));
    } catch (error) {
        actionData.showLoader(false);
        yield put(Actions.apiFailure(error));
    }
}


function* getCombineLabelByUser(actionData) {
    try {
        // actionData.showLoader(true);
        const userData = yield sessionService.getStorageData("userData");
        const userLabel = yield LabelUtils.getCombineLabelByUser(userData.id, userData.token);
        actionData.showLoader(false);
        const labelArray = [];
        userLabel.labels.map(item => {
            labelArray.push(item.name);
        });
        yield put(Actions.loadCombineLabelData(userLabel, labelArray));
    } catch (error) {
        actionData.showLoader(false);
        yield put(Actions.apiFailure(error));
    }
}



export function* watchOnAddLabel() {
    yield takeLatest(Types.ADD_LABEL, addLabelData);
}

export function* watchOnUpdateLabel() {
    yield takeLatest(Types.UPDATE_LABEL, updateLabelData);
}

export function* watchOnRemoveLabel() {
    yield takeLatest(Types.DELETE_LABEL, removeLabel);
}

export function* watchOnGetAllLabel() {
    yield takeLatest(Types.GET_ALL_LABEL_BY_USER, getLabelByUser);
}

export function* watchOnGetAllCombineLabel() {
    yield takeLatest(Types.GET_ALL_CUSTOM_DEFAULT_LABEL, getCombineLabelByUser);
}