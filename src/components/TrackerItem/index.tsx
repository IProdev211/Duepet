import React from "react";
import styled from "styled-components";
import ThemeStyle from "styles/theme";
import { Image, View } from "react-native";
import { FontSize, RespScreenWidth, RespScreenHeight } from "styles/sizes";
import I18nContext from "translations/I18nContext";

interface Item {
  name: string;
  image?: any;
}

interface IProps {
  item: Item;
  onPress: any;
}

const TrackerItem: React.FC<IProps> = ({ item, onPress }) => {
  const Container = styled.View`
    flex-direction: column;
    width: ${RespScreenWidth(28)};
    margin: ${RespScreenHeight(1.5)};
  `;

  const ItemBackground = styled.TouchableOpacity`
    background-color: ${ThemeStyle.backgroundWhite};
    height: ${RespScreenWidth(28)};
    border-radius: ${RespScreenWidth(2)};
    elevation: 5;
    align-items: center;
    justify-content: center;
  `;

  const ItemText = styled.Text`
    font-size: ${FontSize.lg};
    color: ${ThemeStyle.commonText};
    text-align: center;
    margin-top: ${RespScreenHeight(1)};
  `;

  return (
    <View style={{ flex: 1 }}>
      <Container>
        <ItemBackground onPress={onPress}>
          {item.image && <Image source={item.image} />}
        </ItemBackground>
        <ItemText>
          {I18nContext.getString("tracker_title_" + item.name)}
        </ItemText>
      </Container>
    </View>
  );
};

export default TrackerItem;
