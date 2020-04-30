import React from "react";

import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  ActivityIndicator
} from "react-native";
import ThemeStyle from "styles/theme";
import ListView from "deprecated-react-native-listview";
import PropTypes from "prop-types";
import { MaterialIcons } from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import ThemeVariables from "styles/themeVariables";
import styled from "styled-components";
import {
  CustomContainer,
  CustomInputContainer,
  Input,
  CustomIconContainer,
  CustomLabelText,
  CheckMarkIcon
} from "styles/designSystem";
import { RespScreenWidth, RespScreenHeight, FontSize } from "styles/sizes";
import I18nContext from "translations/I18nContext";

const TOUCHABLE_ELEMENTS = [
  "TouchableOpacity",
  "TouchableWithoutFeedback",
  "TouchableNativeFeedback"
];

const FlexContainer = styled(View)`
  flex-direction: row;
  position: absolute;
  height: ${(33 + StyleSheet.hairlineWidth) * 5 + "px"};
  border-width: ${StyleSheet.hairlineWidth + "px"};
  border-color : ${ThemeStyle.lightGrey}
  border-radius: 2px;
  border-top-left-radius: ${props => (props.rating ? "10px" : "0px")}
  border-top-right-radius: ${props => (props.rating ? "10px" : "0px")}
  background-color: ${ThemeStyle.commonText};
  justify-content: center;
`;

const ModalWrrapper = styled(View)`
  flex-grow: 1;
`;

const CancelText = styled(Text)`
  color: ${ThemeStyle.backgroundDark};
  margin-right: ${RespScreenHeight(2)};
`;

const OkText = styled(Text)`
  color: ${ThemeStyle.backgroundDark};
`;

const CheckMark = styled(MaterialIcons)`
  text-align: center;
  margin-top: auto;
  margin-bottom: auto;
`;

const ListViewContainer = styled(ListView)`
  margin-bottom: ${props =>
    props.multiple === "true" ? RespScreenHeight(5.4) : RespScreenHeight(0)};
`;

const ModalFooter = styled(View)`
  flex-direction: row;
  position: absolute;
  bottom: ${RespScreenHeight(1)};
  right: ${RespScreenWidth(4)};
`;

const CheckBox = styled(View)`
border-width: 1px;
border-color : ${ThemeStyle.backgroundLight};
background-color : ${props =>
    props.bgColor ? ThemeStyle.backgroundLight : ThemeStyle.commonText};
width : ${RespScreenHeight(4.5)};
height : ${RespScreenHeight(4.5)};
margin-top : auto;
margin-bottom ; auto;
margin-left : auto;
margin-right : ${RespScreenWidth(4)};
`;
const SeparatorView = styled(View)`
  height: ${StyleSheet.hairlineWidth + "px"};
  background-color: ${ThemeStyle.commonText};
`;

const RowWrrapper = styled(View)`
  background-color: ${props =>
    props.rating
      ? ThemeStyle["chartBar_level_" + props.level]
      : ThemeStyle.commonText};
  flex-direction: row;
`;

const RowText = styled(Text)`
  padding-horizontal: 6px;
  padding-vertical: 10px;
  font-size: ${FontSize.lg};
  color: ${props =>
    props.rating ? ThemeStyle.commonText : ThemeStyle.backgroundDark};
  background-color: ${props =>
    props.rating
      ? ThemeStyle["chartBar_level_" + props.level]
      : ThemeStyle.commonText};
  text-align-vertical: center;
`;

interface SelectState {
  buttonText: string;
  selectedIndex: number;
  accessible: any;
  loading: any;
  showDropdown: boolean;
  selectedItem?: Array<string>;
}
interface ModalSelect {
  buttonText?: string;
  selectedIndex?: number;
  defaultValue?: any;
  options?: any;
  componentFrame?: any;
  defaultIndex?: any;
  renderButtonText?: any;
  isabled?: boolean;
  accessible?: any;
  children?: any;
  placeholder?: string;
  label?: any;
  textStyle?: any;
  onDropdownWillShow?: any;
  animated?: any;
  dropdownStyle?: any;
  onDropdownWillHide?: any;
  style?: any;
  disabled?: boolean;
  adjustFrame?: any;
  onSelect?: any;
  leftSide?: any;
  marginHz?: number;
  scrollEnabled?: any;
  renderSeparator?: any;
  showsVerticalScrollIndicator?: any;
  keyboardShouldPersistTaps?: any;
  renderRow?: any;
  dropdownTextStyle?: any;
  props?: any;
  opacity?: any;
  value?: string;
  password?: any;
  valueChange?: any;
  editable?: boolean;
  rating?: boolean;
  setting?: boolean;
  underline?: boolean;
  inverseColor?: boolean;
  property?: any;
  afterIcon?: any;
  multiple?: string;
  trackerLog?: boolean;
  dropdownTextHighlightStyle?: any;
  onConfirm?: (params: Array<string>) => {};
  validationError?: any;
}
class CustomDropdownSelect extends React.Component<ModalSelect> {
  static propTypes = {
    disabled: PropTypes.bool,
    scrollEnabled: PropTypes.bool,
    defaultIndex: PropTypes.number,
    defaultValue: PropTypes.string,
    options: PropTypes.array,
    marginHz: PropTypes.string,
    editable: PropTypes.bool,
    setting: PropTypes.bool,
    underline: PropTypes.bool,
    inverseColor: PropTypes.bool,

    accessible: PropTypes.bool,
    animated: PropTypes.bool,
    showsVerticalScrollIndicator: PropTypes.bool,
    keyboardShouldPersistTaps: PropTypes.string,

    style: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
      PropTypes.array
    ]),
    textStyle: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
      PropTypes.array
    ]),
    dropdownStyle: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
      PropTypes.array
    ]),
    dropdownTextStyle: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
      PropTypes.array
    ]),
    dropdownTextHighlightStyle: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
      PropTypes.array
    ]),

    adjustFrame: PropTypes.func,
    renderRow: PropTypes.func,
    renderSeparator: PropTypes.func,
    renderButtonText: PropTypes.func,

    onDropdownWillShow: PropTypes.func,
    onDropdownWillHide: PropTypes.func,
    onSelect: PropTypes.func
  };

  static defaultProps = {
    disabled: false,
    scrollEnabled: true,
    defaultIndex: -1,
    defaultValue: "",
    options: null,
    animated: true,
    editable: true,
    underline: true,
    setting: false,
    rating: false,
    inverseColor: false,
    showsVerticalScrollIndicator: true,
    keyboardShouldPersistTaps: "never"
  };
  button: any;
  buttonFrame: any;
  nextValue: any;
  nextIndex: any;
  state = {} as SelectState;

  constructor(props) {
    super(props);
    this.button = null;
    this.buttonFrame = this.props.componentFrame;
    this.nextValue = null;
    this.nextIndex = null;
    this.state = {
      accessible: !!props.accessible,
      loading: !props.options,
      showDropdown: false,
      buttonText: props.defaultValue,
      selectedIndex: props.defaultIndex,
      selectedItem: []
    };
  }

  static getDerivedStateFromProps = (props, state) => {
    if (props.defaultValue !== state.buttonText) {
      return {
        buttonText: props.defaultValue
      };
    }
    return null;
  };

  _updatePosition(callback) {
    if (this.button && this.button.measure) {
      this.button.measure((fx, fy, width, height, px, py) => {
        this.buttonFrame = { x: px, y: py, w: width, h: height };
        callback && callback();
      });
    }
  }

  show() {
    this._updatePosition(() => {
      this.setState({
        showDropdown: true
      });
    });
  }

  hide() {
    this.setState({
      showDropdown: false
    });
  }

  render() {
    return (
      <View {...this.props}>
        <CustomContainer marginHz={this.props.marginHz}>
          {this.props.label && (
            <CustomLabelText>{this.props.label}</CustomLabelText>
          )}
          <TouchableOpacity
            ref={button => (this.button = button)}
            onPress={() => {
              this.props.disabled ? {} : this._onButtonPress();
            }}
          >
            <CustomInputContainer
              underline={
                this.props.editable ||
                this.props.setting ||
                this.props.underline
              }
              setting={this.props.setting}
              inverseColor={this.props.inverseColor}
              inputBtmSpacing={this.props.inverseColor ? 1.5 : 0}
            >
              <Input
                numberOfLines={1}
                value={this.state.buttonText}
                secureTextEntry={this.props.password}
                placeholder={this.props.placeholder}
                editable={this.props.editable}
                setting={this.props.setting}
                onChangeText={(text: any) => {
                  this.props.valueChange(text, this.props.property);
                }}
              />
              {this.props.afterIcon && (
                <CustomIconContainer>
                  {this.props.afterIcon}
                </CustomIconContainer>
              )}
            </CustomInputContainer>
          </TouchableOpacity>
          <View>{this.props.validationError}</View>
        </CustomContainer>
        {this._renderModal()}
      </View>
    );
  }

  select(idx) {
    const {
      defaultValue,
      options,
      defaultIndex,
      renderButtonText
    } = this.props;

    let value = defaultValue;
    if (idx == null || !options || idx >= options.length) {
      idx = defaultIndex;
    }

    if (idx >= 0) {
      value = renderButtonText
        ? renderButtonText(options[idx])
        : options[idx].toString();
    }

    this.nextValue = value;
    this.nextIndex = idx;

    this.setState({
      buttonText: value,
      selectedIndex: idx
    });
  }

  _onButtonPress = () => {
    const { onDropdownWillShow } = this.props;
    if (!onDropdownWillShow || onDropdownWillShow() !== false) {
      this.show();
    }
  };

  _renderModal() {
    const {
      animated,
      accessible,
      dropdownStyle,
      multiple,
      onConfirm
    } = this.props;
    if (this.state.showDropdown && this.buttonFrame) {
      const frameStyle = this._calcPosition();
      const animationType = animated ? "fade" : "none";
      return (
        <Modal
          animationType={animationType}
          visible={true}
          transparent={true}
          onRequestClose={this._onRequestClose}
          supportedOrientations={[
            "portrait",
            "portrait-upside-down",
            "landscape",
            "landscape-left",
            "landscape-right"
          ]}
        >
          <TouchableWithoutFeedback
            accessible={accessible}
            disabled={!this.state.showDropdown}
            onPress={multiple !== "true" ? this._onModalPress : null}
          >
            <ModalWrrapper>
              <FlexContainer
                style={[dropdownStyle, frameStyle]}
                rating={this.props.rating}
              >
                {this._renderDropdown()}
                {multiple === "true" ? (
                  <ModalFooter>
                    <TouchableOpacity onPress={() => this.hide()}>
                      <CancelText>{I18nContext.getString("cancel")}</CancelText>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        onConfirm(this.state.selectedItem);
                        this.hide();
                      }}
                    >
                      <OkText>{I18nContext.getString("ok")}</OkText>
                    </TouchableOpacity>
                  </ModalFooter>
                ) : null}
              </FlexContainer>
            </ModalWrrapper>
          </TouchableWithoutFeedback>
        </Modal>
      );
    }
  }

  _calcPosition() {
    const { adjustFrame, leftSide } = this.props;
    const dimensions = Dimensions.get("window");
    const windowWidth = dimensions.width;
    const buttonFrame = this.buttonFrame;
    const dropdownHeight = "auto";
    const positionStyle: any = {
      height: dropdownHeight,
      top: buttonFrame.y + buttonFrame.h - hp("2.5"),
      maxHeight: this.props.trackerLog ? hp("24%") : hp("30%")
    };
    if (!leftSide) {
      buttonFrame.w = buttonFrame.w;
      const rightSpace = (windowWidth - buttonFrame.w) / 2;
      positionStyle.left = rightSpace;
      positionStyle.right = rightSpace;
    } else if (leftSide === "true") {
      buttonFrame.w = buttonFrame.w;
      positionStyle.left = buttonFrame.x;
    }
    positionStyle.width = buttonFrame.w;
    return adjustFrame ? adjustFrame(positionStyle) : positionStyle;
  }

  _onRequestClose = () => {
    const { onDropdownWillHide } = this.props;
    if (!onDropdownWillHide || onDropdownWillHide() !== false) {
      this.hide();
    }
  };

  _onModalPress = () => {
    this.hide();
    const { onDropdownWillHide } = this.props;
    if (!onDropdownWillHide || onDropdownWillHide() !== false) {
      this.hide();
    }
  };

  _renderLoading() {
    return <ActivityIndicator size="small" />;
  }

  _renderDropdown() {
    const {
      scrollEnabled,
      renderSeparator,
      keyboardShouldPersistTaps,
      multiple,
      rating
    } = this.props;
    return (
      <View
        style={
          rating
            ? {
              paddingTop: 20,
              flex: 1
            }
            : { flex: 1 }
        }
      >
        <ListViewContainer
          multiple={multiple}
          scrollEnabled={scrollEnabled}
          dataSource={this.dataSource}
          renderRow={this._renderRow}
          renderSeparator={
            !this.props.rating && (renderSeparator || this._renderSeparator)
          }
          automaticallyAdjustContentInsets={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        />
      </View>
    );
  }

  get dataSource() {
    const { options } = this.props;
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    return ds.cloneWithRows(options);
  }

  _renderRow = (rowData, sectionID, rowID, highlightRow) => {
    const {
      renderRow,
      dropdownTextStyle,
      dropdownTextHighlightStyle,
      accessible,
      multiple,
      rating
    } = this.props;
    const { selectedIndex } = this.state;
    const key = `row_${rowID}`;
    const highlighted = rowID == selectedIndex;
    const row = !renderRow ? (
      <RowWrrapper rating={rating} level={rowData}>
        <RowText
          style={[dropdownTextStyle, highlighted && dropdownTextHighlightStyle]}
          highlighted={highlighted}
          rating={rating}
          level={rowData}
        >
          {rowData}
        </RowText>
        {multiple === "true" ? (
          <CheckBox bgColor={this.state.selectedItem[rowID] === rowData}>
            {this.state.selectedItem[rowID] === rowData ? (
              <CheckMarkIcon
                size={23}
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "auto",
                  marginBottom: "auto"
                }}
                name={"check"}
              ></CheckMarkIcon>
            ) : null}
          </CheckBox>
        ) : null}
      </RowWrrapper>
    ) : (
        renderRow(rowData, rowID, highlighted)
      );
    const preservedProps = {
      key,
      accessible,
      onPress: () =>
        multiple === "true"
          ? this.onSelect(rowID, rowData)
          : this._onRowPress(rowData, sectionID, rowID, highlightRow)
    };
    if (TOUCHABLE_ELEMENTS.find(name => name == row.type.displayName)) {
      const props = { ...row.props };
      props.key = preservedProps.key;
      props.onPress = preservedProps.onPress;
      const { children } = row.props;
      switch (row.type.displayName) {
        case "TouchableHighlight": {
          return (
            <TouchableHighlight
              underlayColor={ThemeStyle.commonText}
              {...props}
            >
              {children}
            </TouchableHighlight>
          );
        }
        case "TouchableOpacity": {
          return <TouchableOpacity {...props}>{children}</TouchableOpacity>;
        }
        case "TouchableWithoutFeedback": {
          return (
            <TouchableWithoutFeedback {...props}>
              {children}
            </TouchableWithoutFeedback>
          );
        }
        case "TouchableNativeFeedback": {
          return (
            <TouchableNativeFeedback {...props}>
              {children}
            </TouchableNativeFeedback>
          );
        }
        default:
          break;
      }
    }
    return (
      <TouchableHighlight
        underlayColor={ThemeStyle.commonText}
        {...preservedProps}
      >
        {row}
      </TouchableHighlight>
    );
  };

  onSelect = (index: number, item: string) => {
    const items = this.state.selectedItem;
    const findIndex = items.indexOf(item, 0);
    if (findIndex === -1) {
      items[index] = item;
    } else {
      items[index] = "";
    }
    this.setState({ selectedItem: items });
  };

  _onRowPress(rowData, sectionID, rowID, highlightRow) {
    const { onSelect, renderButtonText, onDropdownWillHide } = this.props;
    if (!onSelect || onSelect(rowID, rowData) !== false) {
      highlightRow(sectionID, rowID);
      const value =
        (renderButtonText && renderButtonText(rowData)) || rowData.toString();
      this.nextValue = value;
      this.nextIndex = rowID;
      this.setState({
        buttonText: value,
        selectedIndex: rowID
      });
    }
    if (!onDropdownWillHide || onDropdownWillHide() !== false) {
      this.setState({
        showDropdown: false
      });
    }
  }

  _renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => {
    const key = `spr_${rowID}`;
    return <SeparatorView key={key} />;
  };
}

export default CustomDropdownSelect;
