import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import StarRating from './StarRating';
import Slider from '@react-native-community/slider';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilter: (duration: number, popularity: number, sortBy: string) => void;
  onResetFilters: () => void;
}

const FilterModal = ({ visible, onClose, onApplyFilter, onResetFilters  }: FilterModalProps) => {
  const [selectedDuration, setSelectedDuration] = useState(2); // domyślnie 2 minuty
  const [selectedPopularity, setSelectedPopularity] = useState(3); // jako liczba gwiazdek
  const [sortBy, setSortBy] = useState('duration'); // domyślnie sortowanie po czasie

  const applyFilter = () => {
    onApplyFilter(selectedDuration * 60 * 1000, selectedPopularity * 20, sortBy); // Dodajemy sortowanie
    onClose();
  };

  const resetFilters = () => {
    setSelectedDuration(2); // Reset do domyślnych wartości
    setSelectedPopularity(3);
    setSortBy('duration');
    onResetFilters(); // Funkcja resetująca filtry w komponencie ChooseMusic
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Filtruj utwory</Text>

          <Text style={styles.filterLabel}>Makysmalny czas trwania (minuty): {selectedDuration}</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={5}
            step={1}
            value={selectedDuration}
            onValueChange={setSelectedDuration}
            minimumTrackTintColor="#DF5202"
            maximumTrackTintColor="#333333"
          />

          <Text style={styles.filterLabel}>Maksymalna popularność:</Text>
          <TouchableOpacity onPress={() => setSelectedPopularity((selectedPopularity % 5) + 1)}>
            <StarRating rating={selectedPopularity * 20} />
          </TouchableOpacity>

          <Text style={styles.filterLabel}>Sortowanie:</Text>
          <View style={styles.sortOptions}>
            <TouchableOpacity
              style={[styles.sortButton, sortBy === 'duration' && styles.activeSortButton]}
              onPress={() => setSortBy('duration')}
            >
              <Text style={styles.sortButtonText}>Czas trwania</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sortButton, sortBy === 'popularity' && styles.activeSortButton]}
              onPress={() => setSortBy('popularity')}
            >
              <Text style={styles.sortButtonText}>Popularność</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={applyFilter}>
              <Text style={styles.buttonText}>Zastosuj</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Anuluj</Text>
            </TouchableOpacity>

          </View>
          <View style={styles.buttonReset}>
          <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetFilters}>
              <Text style={styles.buttonText}>Resetuj filtry</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '52%',
  },
  resetButton: {
    backgroundColor: '#555555',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  filterLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
  },
  buttonReset:{
    width: '100%',
    flexDirection: 'row',
    marginTop: 10, 
  },
  slider: {
    width: '100%',
    height: 40,

  },
  sortOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sortButton: {
    backgroundColor: '#333333',
    padding: 10,
    borderRadius: 8,
    width: '49%',
    alignItems: 'center',
  },
  activeSortButton: {
    backgroundColor: '#DF5202',
  },
  sortButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#DF5202',
    padding: 12,
    borderRadius: 8,
    width: '49%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#555555',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default FilterModal;
