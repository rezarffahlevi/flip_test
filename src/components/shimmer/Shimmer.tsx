import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, Dimensions, DimensionValue } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

type ShimmerProps = {
  width?: DimensionValue;
  height?: number;
  borderRadius?: number;
  count?: number;
  spacing?: number;
};

const Shimmer: React.FC<ShimmerProps> = ({
  width = '100%',
  height = 100,
  borderRadius = 6,
  count = 1,
  spacing = 16,
}) => {
  const shimmerAnimation = useRef(new Animated.Value(-SCREEN_WIDTH)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnimation, {
        toValue: SCREEN_WIDTH,
        duration: 1500,
        useNativeDriver: true, // Optimize performance
      })
    ).start();
  }, [shimmerAnimation]);

  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.card,
            {
              width,
              height,
              borderRadius,
              marginBottom: index < count - 1 ? spacing : 0,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.shimmerOverlay,
              { transform: [{ translateX: shimmerAnimation }] },
            ]}
          >
            <View style={styles.shimmerGradient} />
          </Animated.View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
  },
  card: {
    backgroundColor: '#e0e0e0', // Base shimmer background
    overflow: 'hidden',
  },
  shimmerOverlay: {
    ...StyleSheet.absoluteFillObject, // Ensure it overlays the card
  },
  shimmerGradient: {
    flex: 1,
    width: SCREEN_WIDTH, // The shimmer effect width
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Light shimmer effect
    opacity: 0.5,
    borderRadius: 6,
  },
});

export default React.memo(Shimmer);
