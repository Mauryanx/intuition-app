import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as StoreReview from 'expo-store-review';

// Placeholder Assets (use your actual assets in production)
const AVATAR_1 = require('@/assets/splash-icon.png'); 
// In a real app, you'd have distinct avatar images

interface Review {
  id: string;
  name: string;
  handle: string;
  text: string;
  rating: number;
}

const REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Alex Slater',
    handle: '@slater',
    rating: 5,
    text: "Intuition Trainer has been a total game-changer. The micro-drills make decision making effortless and the progress charts keep me motivated. I’ve already closed 2 major deals by trusting my gut.",
  },
  {
    id: '2',
    name: 'Blake Anderson',
    handle: '@bwa',
    rating: 5,
    text: "I used to struggle with overthinking, but this made it simple. Just doing the daily sprint helped me stay consistent. My anxiety is down 40% in 6 weeks — highly recommend!",
  },
  {
    id: '3',
    name: 'Zach Yadegari',
    handle: '@zach',
    rating: 5,
    text: "The personalized insights helped me understand my bias patterns. It’s like having a cognitive coach in my pocket. I’ve stopped second-guessing and finally feel in control.",
  },
];

interface ReviewScreenViewProps {
  onComplete: () => void;
}

export function ReviewScreenView({ onComplete }: ReviewScreenViewProps) {
  
  useEffect(() => {
    // Attempt to prompt for a rating after a delay, mimicking the reference behavior
    const timer = setTimeout(async () => {
      if (await StoreReview.hasAction()) {
        StoreReview.requestReview();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Give us a rating</Text>
          <View style={styles.starsContainer}>
             {[1,2,3,4,5].map(i => (
               <Ionicons key={i} name="star" size={32} color="#FFD700" />
             ))}
          </View>
        </View>

        {/* Social Proof Stats */}
        <View style={styles.socialProof}>
          <Text style={styles.socialTitle}>This app was designed for people like you.</Text>
          <View style={styles.avatarsRow}>
             <View style={styles.avatarGroup}>
                {[1,2,3].map((i) => (
                  <Image key={i} source={AVATAR_1} style={[styles.miniAvatar, { marginLeft: i > 0 ? -10 : 0 }]} />
                ))}
             </View>
             <Text style={styles.socialCount}>+ 10,000 people</Text>
          </View>
        </View>

        {/* Reviews List */}
        <View style={styles.reviewsList}>
          {REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </View>

      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={onComplete} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image source={AVATAR_1} style={styles.cardAvatar} />
        <View style={styles.cardMeta}>
          <Text style={styles.cardName}>{review.name}</Text>
          <Text style={styles.cardHandle}>{review.handle}</Text>
        </View>
        <View style={styles.cardStars}>
           {Array.from({ length: review.rating }).map((_, i) => (
             <Ionicons key={i} name="star" size={12} color="#FFD700" />
           ))}
        </View>
      </View>
      <Text style={styles.cardText}>"{review.text}"</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 24,
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  socialProof: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 20,
  },
  socialTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  avatarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatarGroup: {
    flexDirection: 'row',
  },
  miniAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'white',
  },
  socialCount: {
    color: '#8E8E93',
    fontWeight: '500',
  },
  reviewsList: {
    gap: 16,
  },
  // Card
  card: {
    backgroundColor: '#F2F2F7',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  cardMeta: {
    flex: 1,
  },
  cardName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardHandle: {
    color: '#8E8E93',
    fontSize: 14,
  },
  cardStars: {
    flexDirection: 'row',
    gap: 2,
  },
  cardText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
    color: '#333',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 40,
    backgroundColor: 'white',
  },
  nextButton: {
    backgroundColor: 'black',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
});

