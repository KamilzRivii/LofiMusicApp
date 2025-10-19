import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

const SearchInput = ({ value, onChange }: { value: string; onChange: (text: string) => void }) => {
  const [currentValue, setCurrentValue] = useState(value);

  return (
    <TextInput
      style={styles.searchInput}
      placeholder="Search..."
      placeholderTextColor="#AAAAAA"
      value={currentValue}
      onChangeText={(text) => setCurrentValue(text)}
      onEndEditing={() => onChange(currentValue)}
    />
  );
};

const styles = StyleSheet.create({
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#222222',
    color: '#FFFFFF',
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
  },
});

export default SearchInput;
