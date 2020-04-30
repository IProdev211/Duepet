import styled from "styled-components";
import ThemeStyle from "styles/theme";
import { RespScreenHeight, RespScreenWidth } from "styles/sizes";

export const TrackersContainer = styled.View`
  flex: 1;
  background-color: ${ThemeStyle.backgroundLight};
  elevation: 3;
`;

export const TrackersRowContainer = styled.View`
  flex-direction: row;
`;

export const PetsCarouselWrapper = styled.View`
  margin-top: ${RespScreenHeight(2)};
`;
