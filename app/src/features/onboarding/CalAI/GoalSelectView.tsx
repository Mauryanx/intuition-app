import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

// --- Data ---

interface Goal {
  id: string;
  icon: string; // Ionicons name
  title: string;
  color: string;
}

const GOALS: Goal[] = [
  { id: '1', icon: 'trending-up', title: 'Reach weight goals faster', color: '#007AFF' }, // Blue
  { id: '2', icon: 'happy', title: 'Boost mood and confidence', color: '#FFCC00' }, // Yellow
  { id: '3', icon: 'flash', title: 'More daily energy', color: '#FF9500' }, // Orange
  { id: '4', icon: 'heart', title: 'Better overall health', color: '#FF3B30' }, // Red
  { id: '5', icon: 'calendar', title: 'Stay consistent with habits', color: '#5AC8FA' }, // Cyan
  { id: '6', icon: 'eye', title: 'Clearer focus & productivity', color: '#AF52DE' }, // Purple
  { id: '7', icon: 'sparkles', title: 'Simpler, stress-free tracking', color: '#FF2D55' }, // Pink
];

interface GoalSelectViewProps {
  onComplete: () => void;
}

export function GoalSelectView({ onComplete }: GoalSelectViewProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleGoal = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleContinue = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onComplete();
  };

  const renderItem = ({ item }: { item: Goal }) => {
    const isSelected = selectedIds.has(item.id);
    
    return (
      <TouchableOpacity
        onPress={() => toggleGoal(item.id)}
        activeOpacity={0.8}
        style={[
          styles.goalRow,
          {
            backgroundColor: isSelected 
              ? `${item.color}20` // 20% opacity of the goal color
              : '#F2F2F7', // System gray 6 equivalent
            borderColor: isSelected ? item.color : 'transparent',
          }
        ]}
      >
        <View style={styles.rowContent}>
          {/* Icon Circle */}
          <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
            <Ionicons name={item.icon as any} size={18} color="white" />
          </View>

          {/* Title */}
          <Text style={styles.goalTitle}>{item.title}</Text>

          {/* Checkbox */}
          <View style={{ marginLeft: 'auto' }}>
             {isSelected ? (
               <Ionicons name="checkmark-circle" size={24} color="black" />
             ) : (
               <Ionicons name="ellipse" size={24} color="#C7C7CC" />
             )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Choose your goals</Text>
        <Text style={styles.subtitle}>
          Select your training objectives to build your custom plan.
        </Text>
      </View>

      {/* List */}
      <FlatList
        data={GOALS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleContinue} style={styles.trackButton}>
          <Text style={styles.trackButtonText}>Track these goals</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: 'black',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    lineHeight: 22,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 120, // Space for footer
    gap: 16,
  },
  goalRow: {
    height: 70,
    borderRadius: 35, // Fully rounded pill shape
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderWidth: 1,
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 40,
    backgroundColor: 'white', // Or transparent with blur
  },
  trackButton: {
    backgroundColor: 'black',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  trackButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
});

