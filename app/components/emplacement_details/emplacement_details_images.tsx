import * as React from "react";
import { Dimensions, Image, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
    ICarouselInstance,
    Pagination,
} from "react-native-reanimated-carousel";

const width = Dimensions.get("window").width;

export default function EmplacementDetailsImages({ photos }) {
  const carouselRef = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    carouselRef.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View style={{ alignItems: "center", height: width / 2 + 20 }}>
        <Carousel
          ref={carouselRef}
          width={width}
          height={width / 2}
          data={photos} // Utilisation des photos de l'emplacement
          onProgressChange={(offsetProgress: number, absoluteProgress: number) => {
            progress.value = absoluteProgress;
          }}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Image
                source={{ uri: item }} // Affichage des photos
                style={{
                  width: width,
                  height: width / 2,
                  resizeMode: "cover",
                }}
              />
            </View>
          )}
        />
        <Pagination.Basic
          progress={progress}
          data={photos} // Assurez-vous d'utiliser les photos comme données pour la pagination
          dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
          containerStyle={{ gap: 5, marginTop: 0 }}
          onPress={onPressPagination}
        />
      </View>
    </View>
  );
}
