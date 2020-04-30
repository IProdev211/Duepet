import React from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { AppContainer } from "styles/designSystem";
import I18nContext from "translations/I18nContext";
import * as MediaLibrary from "expo-media-library";
import { SecondaryButton } from "components/Button";
import { BottomContainer } from "styles/designSystem";
import {
  FooterText,
  FooterContainer,
  ImageItemContainer,
  ImageItem,
  FlatListContainer
} from "./Gallery.style";

const NUM_COLUMNS = 3;
const PAGE_SIZE = NUM_COLUMNS * 10;

const getImages = async params => {
  return await new Promise((resolve, reject) => {
    MediaLibrary.getAssetsAsync(params)
      .then(data => {
        const { assets, ...page_info } = data;
        const images = assets;
        resolve({ images, page_info });
      })
      .catch(reject);
  });
};

class Gallery extends React.Component<{ navigation: any }> {
  state = {
    images: [],
    end_cursor: null,
    has_next_page: false,
    selectedImage: -1
  };

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await this.getMoreImages();
  }

  getMoreImages = async () => {
    const { end_cursor, has_next_page, images } = this.state;
    let date = new Date(0);

    const { images: newImages, page_info: pageInfo } = await getImages({
      first: PAGE_SIZE,
      after: end_cursor,
      createdAfter: date
    });
    this.setState({
      images: (images || []).concat(newImages),
      end_cursor: pageInfo.endCursor,
      has_next_page: pageInfo.hasNextPage
    });
  };

  render() {
    const { navigation } = this.props;
    const Item = ({ uri, onPress, index }) => (
      <ImageItemContainer onPress={onPress}>
        <ImageItem
          source={{ uri }}
          border={index == this.state.selectedImage}
        />
      </ImageItemContainer>
    );

    const LoadingFooter = ({ hasMore }) => (
      <FooterContainer>
        {hasMore && <ActivityIndicator />}
        <FooterText>{hasMore ? "Loading more photos..." : ""}</FooterText>
      </FooterContainer>
    );

    return (
      <AppContainer>
        <FlatListContainer>
          <FlatList
            data={this.state.images || []}
            renderItem={({ item, index }) => (
              <Item
                uri={item.uri}
                index={index}
                onPress={() => this.setState({ selectedImage: index })}
              />
            )}
            ListFooterComponent={
              <LoadingFooter
                hasMore={this.state.has_next_page}
                animating={false}
              />
            }
            keyExtractor={item => item.uri}
            numColumns={NUM_COLUMNS}
            onEndReachedThreshold={0.5}
            onEndReached={this.getMoreImages}
          />
        </FlatListContainer>
        <BottomContainer>
          <SecondaryButton
            onPress={() => {
              this.state.selectedImage != -1 &&
                navigation.navigate(navigation.state.params.from, {
                  image: this.state.images[this.state.selectedImage],
                  petData: null
                });
            }}
            textTransform={"uppercase"}
            width={100}
            padding={20}
            text={I18nContext.getString("ok")}
          />
        </BottomContainer>
      </AppContainer>
    );
  }
}

export default Gallery;
