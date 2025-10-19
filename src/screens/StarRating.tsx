import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface StarRatingProps {
  rating: number; // liczba gwiazdek do zapalenia
}

const StarRating = ({ rating }: StarRatingProps) => {
  const maxStars = 5;
  const filledStars = Math.floor((rating / 100) * maxStars); // Oblicz liczbę zapalonych gwiazdek

  return (
    <View style={styles.container}>
      {[...Array(maxStars)].map((_, index) => (
        <Icon
          key={index}
          name={index < filledStars ? 'star' : 'star-o'} // 'star' dla zapalonej, 'star-o' dla pustej
          size={15}
          color="#DF5202"
          style={styles.star}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  star: {
    margin: 2,
  },
});

export default StarRating;
