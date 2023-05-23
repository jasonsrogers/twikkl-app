import { StyleSheet, TouchableOpacity, View, ImagePropsBase, Image, FlatList, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Badge } from "react-native-paper";
import { Video, ResizeMode } from "expo-av";
import { ViewVariant, TwikklIcon, EIcon } from "@twikkl/configs";
import { useColors } from "@twikkl/hooks";
import { ButtonAddSimple } from "@twikkl/components";
import VideoFeedItem from "@twikkl/components/VideoFeedItem";
import { useRef, useState } from "react";

const DEFAULT_CAMERA_ACTION_COLOR = "#FFF";

//get device width and height
const { width, height } = Dimensions.get("window");

/**
 * TODO - Build Home screen component
 *
 * @constructor
 */

const profileImg = require("@assets/imgs/logos/profile.png") as ImagePropsBase["source"];


export default function ScreenHome() {
  const { primary: colorPrimary } = useColors();
  const items = [
    { video: require("@assets/videos/dog.mp4") },
    { video: require("@assets/videos/girl.mp4") },
    { video: require("@assets/videos/ballon.mp4") },
    { video: require("@assets/videos/home-temp.mp4") },
  ]

  const flatListRef = useRef<FlatList>(null);
  const [visibleIndex, setVisibleIndex] = useState<number>(0);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.y;
    const index = Math.floor(contentOffset / (height));

    setVisibleIndex(index);
  };


  return (
    <>
      {/* <FlatList
        style={[StyleSheet.absoluteFill]}
        data={[' My Feed', 'Discover']}
        renderItem={({ item, index }) => */}
      <FlatList
        style={[StyleSheet.absoluteFill]}
        // contentContainerStyle={{
        //   width: width,
        //   height: height,
        // }}
        data={items}
        renderItem={({ item, index }) =>
          <VideoFeedItem item={item} index={index} visibleIndex={visibleIndex} />
        }
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
      />
      {/* }
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      /> */}


      <SafeAreaView style={styles.innerContainer}>
        <View style={ViewVariant.rowSpaceBetween}>
          <TwikklIcon name={EIcon.TIMER_24} size={24} color={DEFAULT_CAMERA_ACTION_COLOR} />
          <View style={ViewVariant.centered}>
            <Text variant="titleMedium" style={styles.headActionText}>
              My Feed
            </Text>
            <Badge size={10} style={{ ...styles.headActionIndicator, backgroundColor: colorPrimary }} />
          </View>
          <View>
            <Text variant="titleMedium" style={styles.headActionText}>
              Discover
            </Text>
            <Badge size={10} style={{ ...styles.headActionIndicator, backgroundColor: DEFAULT_CAMERA_ACTION_COLOR }} />
          </View>
          <View>
            <TwikklIcon name={EIcon.BELL} size={24} color={DEFAULT_CAMERA_ACTION_COLOR} />
            <Badge size={10} style={{ backgroundColor: colorPrimary, position: "absolute" }} />
          </View>
        </View>

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    paddingTop: 10,
    marginHorizontal: 14,
  },
  headActionText: {
    color: DEFAULT_CAMERA_ACTION_COLOR,
    fontWeight: "600",
  },
  headActionIndicator: {
    alignSelf: "center",
    marginTop: 0,
    paddingHorizontal: 10,
    paddingVertical: 3,
    height: 5,
  },
  rightActionsContainer: {
    justifyContent: "space-between",
    alignSelf: "flex-end",
    alignItems: "flex-end",
    marginVertical: 10,
    paddingRight: 5,
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#FFF",
  },
});
