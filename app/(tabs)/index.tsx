import { Image, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { useEffect, useState } from 'react';
import { fetchPastQuizzes, fetchUpcomingQuizzes, fetchLeaderboard } from '@/lib/api';

export default function HomeScreen() {
  const [pastQuizzes, setPastQuizzes] = useState<any[]>([]);
  const [upcomingQuizzes, setUpcomingQuizzes] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const past = await fetchPastQuizzes();
        const upcoming = await fetchUpcomingQuizzes();
        const leader = await fetchLeaderboard();

        // console.log('Past Quizzes:', past);
        // console.log('Upcoming Quizzes:', upcoming);
        // console.log('Leaderboard:', leader);

        setPastQuizzes(past);
        setUpcomingQuizzes(upcoming);
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

      {/* Past Quizzes */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Past Quizzes</ThemedText>
        {pastQuizzes.length > 0 ? (
          pastQuizzes.map((quiz, index) => (
            <ThemedText key={index}>
              {quiz.title} - {new Date(quiz.date).toDateString()}
              {'\n'}Winners: {quiz.winners?.join(', ') || 'N/A'}
              {'\n'}Finalists: {quiz.finalists?.join(', ') || 'N/A'}
              {'\n'}Participants: {quiz.participants?.join(', ') || 'N/A'}
            </ThemedText>
          ))
        ) : (
          <ThemedText>No past quizzes available.</ThemedText>
        )}
      </ThemedView>

      {/* Upcoming Quizzes */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Upcoming Quizzes</ThemedText>
        {upcomingQuizzes.length > 0 ? (
          upcomingQuizzes.map((quiz, index) => (
            <ThemedText key={index}>
              {quiz.title} - {new Date(quiz.date).toDateString()}
              {'\n'}QMs: {quiz.QMs?.join(', ') || 'N/A'}
              {'\n'}Registration Link: {quiz.registration_link}
            </ThemedText>
          ))
        ) : (
          <ThemedText>No upcoming quizzes available.</ThemedText>
        )}
      </ThemedView>

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
