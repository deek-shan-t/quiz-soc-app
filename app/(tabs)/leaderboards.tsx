import { View, Text } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { useEffect, useState } from 'react';
import { fetchLeaderboard } from '@/lib/api';

export default function Leaderboards() {
    const [leaderboard, setLeaderboard] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const leader = await fetchLeaderboard();

                setLeaderboard(leader);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []); 

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>

      {/* Leaderboard */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Leaderboard</ThemedText>
        {leaderboard.length > 0 ? (
          leaderboard.map((entry, index) => (
            <ThemedText key={index}>
              {entry.quiz_name} - {new Date(entry.quiz_date).toDateString()}
              {'\n'}Mordor: {entry.mordor} | Rivendell: {entry.rivendell} | HelmsDeep: {entry.helmsdeep} | Edoras: {entry.edoras}
            </ThemedText>
          ))
        ) : (
          <ThemedText>No leaderboard data available.</ThemedText>
        )}
      </ThemedView>

    </ParallaxScrollView>
  ); 
}

const styles = StyleSheet.create({
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});