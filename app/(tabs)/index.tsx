import { Image, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import LeaderboardChart from '@/components/LeaderboardChart';
import { useEffect, useState } from 'react';
import { fetchLeaderboard } from '@/lib/api';

export default function HomeScreen() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const leader = await fetchLeaderboard();

        // console.log('Past Quizzes:', past);
        // console.log('Upcoming Quizzes:', upcoming);
        // console.log('Leaderboard:', leader);

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
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Welcome to Quiz Soc!</ThemedText>
        <ThemedText>
          Quiz society IITJ is a society that aims to provide a platform for students to enhance their knowledge and skills in various fields. We conduct quizzes on a regular basis to help students learn and grow.
        </ThemedText>
      </ThemedView>

      {/* Leaderboard
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

      <LeaderboardChart /> */}

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
